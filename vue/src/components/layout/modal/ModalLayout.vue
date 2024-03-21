<template>
    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" class="dialog">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-75" leave="duration-200 ease-in" leave-from="opacity-75" leave-to="opacity-0">
                <div class="backdrop"></div>
            </TransitionChild>
            <div class="custom-modal">
                <div class="content-modal">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-75 scale-100" leave="duration-200 ease-in" leave-from="opacity-75 scale-100" leave-to="opacity-0 scale-95">
                        <DialogPanel class="inner-modal bg-white" :class="!maxWidth || maxWidth == '' ? 'max-w-3xl' : maxWidth" :id="modal_panel_id">
                            <div class="text-black header-modal" :id="modal_header_id">
                                <div scope="col" colspan="6" class="">
                                    {{ title }}
                                </div>
                                <button @click="onClose()" type="button" class="close-modal" data-modal-toggle="defaultModal">
                                    <span class="icon-close"></span>
                                </button>
                            </div>
                            <div style="max-height: calc(100vh - 5rem); overflow-y: auto;">
                                <slot></slot>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel
} from "@headlessui/vue";
</script>
<script>
export default {
    props: ['show', 'title', 'maxWidth', 'class'],
    emits: ["close"],
    data: function () {
        return {
            modal_panel_id: (Math.random() + 1).toString(36).substring(3),
            modal_header_id: (Math.random() + 1).toString(36).substring(3),
        };
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        },
        dragElement: function (element, header) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            try {
                header.onmousedown = dragMouseDown;
            } catch (error) {
                return;
            }
            let elHeight = element.offsetHeight;
            let elWidth = element.offsetWidth;
            let screenHeight = document.getElementById('app').offsetHeight;
            let screenWidth = document.getElementById('app').offsetWidth;

            let minTop = elHeight / 2;
            let maxTop = (screenHeight - elHeight) + (elHeight / 2);
            let minLeft = elWidth / 2;
            let maxLeft = (screenWidth - elWidth) + (elWidth / 2);
            
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:

                if((element.offsetTop - pos2) > maxTop) {
                    element.style.top = maxTop + "px";
                } else if((element.offsetTop - pos2) < minTop) {
                    element.style.top = minTop + "px";
                } else {
                    element.style.top = (element.offsetTop - pos2) + "px";
                }

                if((element.offsetLeft - pos1) > maxLeft) {
                    element.style.left = maxLeft + "px";
                } else if((element.offsetLeft - pos1) < minLeft) {
                    element.style.left = minLeft + "px";
                } else {
                    element.style.left = (element.offsetLeft - pos1) + "px";
                }
            }

            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
            }
        },
        setElement: function () {
            setTimeout((callback = this.dragElement) => {
                let modalPanel = document.getElementById(this.modal_panel_id);
                let modalHeader = document.getElementById(this.modal_header_id);
                callback(modalPanel, modalHeader)
            }, 500);
        }
    },
    updated: function () {
        this.setElement()
    },
    mounted: function () {
        this.setElement()
    }
};
</script>
  