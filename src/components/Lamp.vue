<script setup lang="ts">
import { ref } from 'vue';
import { RotateCcw, Settings } from 'lucide-vue-next';
import type { Lamp } from '../types/lamp';

const props = defineProps<{
  lamp: Lamp;
}>();

const emit = defineEmits<{
  (e: 'update:position', x: number, y: number): void;
  (e: 'update:rotation', rotation: number): void;
  (e: 'update:name', name: string): void;
}>();

const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const initialX = ref(0);
const initialY = ref(0);

const handleDragStart = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  const event = 'touches' in e ? e.touches[0] : e;
  startX.value = event.clientX;
  startY.value = event.clientY;
  initialX.value = props.lamp.x;
  initialY.value = props.lamp.y;
};

const handleDragMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  e.preventDefault();
  const event = 'touches' in e ? e.touches[0] : e;
  const deltaX = event.clientX - startX.value;
  const deltaY = event.clientY - startY.value;
  emit('update:position', initialX.value + deltaX, initialY.value + deltaY);
};

const handleDragEnd = () => {
  isDragging.value = false;
};

const handleRotate = () => {
  emit('update:rotation', (props.lamp.rotation + 90) % 360);
};

const handleNameChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:name', input.value);
};
</script>

<template>
  <div
    class="relative group"
    :style="{
      transform: `translate(${lamp.x}px, ${lamp.y}px) rotate(${lamp.rotation}deg)`,
      cursor: isDragging ? 'grabbing' : 'grab'
    }"
    @mousedown="handleDragStart"
    @mousemove="handleDragMove"
    @mouseup="handleDragEnd"
    @mouseleave="handleDragEnd"
    @touchstart="handleDragStart"
    @touchmove="handleDragMove"
    @touchend="handleDragEnd"
  >
    <div class="w-24 h-8 bg-yellow-400 rounded-lg shadow-lg"></div>
    <div class="absolute -right-8 top-1/2 -translate-y-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        class="btn btn-sm btn-circle btn-ghost"
        @click="handleRotate"
      >
        <RotateCcw class="w-4 h-4" />
      </button>
      <button
        class="btn btn-sm btn-circle btn-ghost"
        @click="$emit('openConfig')"
      >
        <Settings class="w-4 h-4" />
      </button>
    </div>
  </div>
</template> 