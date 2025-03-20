<script setup lang="ts">
import type { Lamp } from '../types/lamp';

const props = defineProps<{
  lamp: Lamp;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:name', name: string): void;
  (e: 'close'): void;
}>();

const handleNameChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:name', input.value);
};
</script>

<template>
  <dialog :class="{ 'modal': true, 'modal-open': isOpen }">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">Configure Lamp</h3>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <input
          type="text"
          :value="lamp.name"
          @input="handleNameChange"
          class="input input-bordered"
        />
      </div>
      <div class="modal-action">
        <button class="btn" @click="$emit('close')">Close</button>
      </div>
    </div>
  </dialog>
</template> 