<script setup lang="ts">
import { ref } from 'vue';
import Lamp from './Lamp.vue';
import LampConfig from './LampConfig.vue';
import { useLamps } from '../composables/useLamps';
import type { Lamp as LampType } from '../types/lamp';

const {
  lamps,
  addLamp,
  removeLamp,
  updateLampPosition,
  updateLampRotation,
  updateLampName
} = useLamps();

const selectedLamp = ref<LampType | null>(null);
const isConfigOpen = ref(false);

const handleOpenConfig = (lamp: LampType) => {
  selectedLamp.value = lamp;
  isConfigOpen.value = true;
};

const handleCloseConfig = () => {
  isConfigOpen.value = false;
  selectedLamp.value = null;
};
</script>

<template>
  <div class="relative w-full max-w-4xl mx-auto">
    <div class="aspect-video bg-gray-100 rounded-lg shadow-lg relative overflow-hidden">
      <Lamp
        v-for="lamp in lamps"
        :key="lamp.id"
        :lamp="lamp"
        @update:position="(x, y) => updateLampPosition(lamp.id, x, y)"
        @update:rotation="(rotation) => updateLampRotation(lamp.id, rotation)"
        @openConfig="handleOpenConfig(lamp)"
      />
    </div>
    
    <div class="flex gap-4 mt-4 justify-center">
      <button class="btn btn-primary" @click="addLamp">
        Add Lamp
      </button>
      <button 
        class="btn btn-error" 
        @click="removeLamp(lamps[lamps.length - 1]?.id)"
        :disabled="lamps.length === 0"
      >
        Remove Last Lamp
      </button>
    </div>

    <LampConfig
      v-if="selectedLamp"
      :lamp="selectedLamp"
      :is-open="isConfigOpen"
      @update:name="(name) => updateLampName(selectedLamp.id, name)"
      @close="handleCloseConfig"
    />
  </div>
</template> 