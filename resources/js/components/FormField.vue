<template>
    <default-field :field="field" :errors="errors" :full-width-content="true">
        <template slot="field">

            <editor
                api-key="2604kltpmbv5417l2iqtfftfzk48tzakdhzcea78btolpsii"
                :init="config"
                :id="field.name"
                type="text"
                class="w-full form-control form-input form-input-bordered"
                :class="errorClasses"
                :placeholder="field.name"
                v-model="value"
            />

            <!--            <input-->
            <!--                :id="field.name"-->
            <!--                type="text"-->
            <!--                class="w-full form-control form-input form-input-bordered"-->
            <!--                :class="errorClasses"-->
            <!--                :placeholder="field.name"-->
            <!--                v-model="value"-->
            <!--            />-->
        </template>
    </default-field>
</template>

<script>
    import { FormField, HandlesValidationErrors } from 'laravel-nova'
    import Editor from '@tinymce/tinymce-vue'

    export default {
        mixins: [FormField, HandlesValidationErrors],

        props: ['resourceName', 'resourceId', 'field'],

        components: {'editor':Editor},

        data() {
            return {
                config: {
                    height: 900,
                    file_picker_callback (callback, value, meta) {
                        let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
                        let y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight

                        tinymce.activeEditor.windowManager.openUrl({
                            url : '/file-manager/tinymce5',
                            title : 'Laravel File manager',
                            width : x * 0.8,
                            height : y * 0.8,
                            onMessage: (api, message) => {
                                callback('http://'+message.content, { text: message.text })
                            }
                        })
                    },
                    language: 'fr_FR',
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image imagetools charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    formats: {
                        'forH3': { block: 'p', classes: 'for-title' }
                    },
                    setup: (editor) => {
                        editor.ui.registry.addSplitButton('ctabutton', {
                            icon: 'template',
                            onAction: function (_) {
                                editor.insertContent('<a class="button button__cta" style="margin: 0 auto" href="#"><span class="button__cta--inner">Bouton CTA</span></a>')
                            },
                            onItemAction: function (buttonApi, value) {
                                editor.insertContent(value);
                            },
                            fetch: function (callback) {
                                var items = [
                                    {
                                        type: 'choiceitem',
                                        text: 'Centrer',
                                        value: '<a class="button button__cta" style="margin: 0 auto" href="#"><span class="button__cta--inner">Bouton CTA</span></a>'
                                    },
                                    {
                                        type: 'choiceitem',
                                        text: 'Gauche',
                                        value: '<a class="button button__cta" href="#"><span class="button__cta--inner">Bouton CTA</span></a>'
                                    },
                                    {
                                        type: 'choiceitem',
                                        text: 'Droite',
                                        value: '<a class="button button__cta" style="margin: 0 67%" href="#"><span class="button__cta--inner">Bouton CTA</span></a>'
                                    }
                                ];
                                callback(items);
                            }
                        });

                        editor.ui.registry.addToggleButton('formatTitle3', {
                            icon: 'unselected',
                            tooltip: 'Texte formaté pour les titre 3',
                            active: editor.dom.hasClass(editor.selection.getNode(), 'for-title'),
                            onAction: function (_) {
                                editor.formatter.toggle('forH3')
                            }
                        });
                    },
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | image | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | ctabutton formatTitle3 removeformat | help',
                }
            }
        },

        methods: {
            /*
             * Set the initial, internal value for the field.
             */
            setInitialValue() {
                this.value = this.field.value || ''
            },

            /**
             * Fill the given FormData object with the field's internal value.
             */
            fill(formData) {
                formData.append(this.field.attribute, this.value || '')
            },

            /**
             * Update the field's internal value.
             */
            handleChange(value) {
                this.value = value
            },
        },
    }
</script>
