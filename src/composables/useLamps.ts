import { ref } from 'vue';
import type { Lamp } from '../types/lamp';

export function useLamps() {
  const lamps = ref<Lamp[]>([]);

  const addLamp = () => {
    const newLamp: Lamp = {
      id: crypto.randomUUID(),
      name: `Lamp ${lamps.value.length + 1}`,
      x: 100,
      y: 100,
      rotation: 0
    };
    lamps.value.push(newLamp);
  };

  const removeLamp = (id: string) => {
    lamps.value = lamps.value.filter(lamp => lamp.id !== id);
  };

  const updateLampPosition = (id: string, x: number, y: number) => {
    const lamp = lamps.value.find(l => l.id === id);
    if (lamp) {
      lamp.x = x;
      lamp.y = y;
    }
  };

  const updateLampRotation = (id: string, rotation: number) => {
    const lamp = lamps.value.find(l => l.id === id);
    if (lamp) {
      lamp.rotation = rotation;
    }
  };

  const updateLampName = (id: string, name: string) => {
    const lamp = lamps.value.find(l => l.id === id);
    if (lamp) {
      lamp.name = name;
    }
  };

  return {
    lamps,
    addLamp,
    removeLamp,
    updateLampPosition,
    updateLampRotation,
    updateLampName
  };
} 