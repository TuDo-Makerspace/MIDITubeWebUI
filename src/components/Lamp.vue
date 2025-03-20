<script setup lang="ts">
import { ref } from 'vue';
import { SettingsIcon, RotateCwIcon } from 'lucide-vue-next';
import type { Lamp } from '../types/lamp';

const props = defineProps<{
  lamp: Lamp;
}>();

const emit = defineEmits<{
  (e: 'update:position', x: number, y: number): void;
  (e: 'update:rotation', rotation: number): void;
  (e: 'update:name', name: string): void;
  (e: 'openConfig'): void;
}>();

const isDragging = ref(false);
const isRotating = ref(false);
const startX = ref(0);
const startY = ref(0);
const initialX = ref(0);
const initialY = ref(0);
const initialRotation = ref(0);

const handleDragStart = (e: MouseEvent | TouchEvent) => {
  if (isRotating.value) return;
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

const handleRotateStart = (e: MouseEvent | TouchEvent) => {
  isRotating.value = true;
  const event = 'touches' in e ? e.touches[0] : e;
  startX.value = event.clientX;
  startY.value = event.clientY;
  initialRotation.value = props.lamp.rotation;
  
  // Add event listeners to document for move and end events
  document.addEventListener('mousemove', handleRotateMove);
  document.addEventListener('mouseup', handleRotateEnd);
  document.addEventListener('touchmove', handleRotateMove);
  document.addEventListener('touchend', handleRotateEnd);
};

const handleRotateMove = (e: MouseEvent | TouchEvent) => {
  if (!isRotating.value) return;
  e.preventDefault();
  const event = 'touches' in e ? e.touches[0] : e;
  
  // Calculate angle between start position and current position
  const deltaX = event.clientX - startX.value;
  const deltaY = event.clientY - startY.value;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  
  // Update rotation with reduced sensitivity (divided by 2)
  emit('update:rotation', (initialRotation.value + angle/3) % 360);
};

const handleRotateEnd = () => {
  isRotating.value = false;
  // Remove event listeners
  document.removeEventListener('mousemove', handleRotateMove);
  document.removeEventListener('mouseup', handleRotateEnd);
  document.removeEventListener('touchmove', handleRotateMove);
  document.removeEventListener('touchend', handleRotateEnd);
};

const handleNameChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:name', input.value);
};
</script>

<template>
  <div
    class="relative"
    :style="{
      transform: `translate(${lamp.x}px, ${lamp.y}px)`,
      cursor: isDragging ? 'grabbing' : isRotating ? 'grabbing' : 'grab'
    }"
    @mousedown="handleDragStart"
    @mousemove="handleDragMove"
    @mouseup="handleDragEnd"
    @mouseleave="handleDragEnd"
    @touchstart="handleDragStart"
    @touchmove="handleDragMove"
    @touchend="handleDragEnd"
  >
    <div 
      class="w-24 h-5 bg-yellow-200 rounded-lg shadow-lg border-2 border-yellow-700"
      :style="{
        position: 'relative',
        transformOrigin: 'center',
        transform: `rotate(${lamp.rotation}deg)`
      }"
    >
      <div style="
        position: absolute;
        top: -2px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 2px;
        padding: 2px;
        align-items: center;
      ">

        <nobr style="
          font-size: 9px;
          color: #666;
          margin: 0 2px;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        ">{{ lamp.name }}</nobr>
                <button
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            padding: 2px;
            border-radius: 2px;
            border: none;
            background: none;
            cursor: pointer;
            color: black;
          "
          @mousedown="handleRotateStart"
          @touchstart="handleRotateStart"
        >
          <RotateCwIcon style="width: 12px; height: 12px;" />
        </button>
        <button
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            padding: 2px;
            border-radius: 2px;
            border: none;
            background: none;
            cursor: pointer;
            color: black;
          "
          @click="$emit('openConfig')"
        >
          <SettingsIcon style="width: 12px; height: 12px;" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button:hover {
  background: #f3f4f6;
}
</style> 