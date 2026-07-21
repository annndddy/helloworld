<script setup lang="ts">
const toast = useToast()
  const clickHandler = () => {    
    toast.add({
      title: 'Hello',
      description: 'This is a toast message.',
      color: 'success',
    })
  }
</script>

<template>
  <UContainer class="py-5">
    <UCard>
      <UCardHeader>
        <UCardTitle>Nuxt 4 + Vue 3 + TailwindCSS</UCardTitle>
      </UCardHeader>
      <UCardBody>
        <p class="text-gray-700 text-base">
          This is a Nuxt 4 project using Vue 3 and TailwindCSS. OKKKKQ
        </p>
        <UButton @click="clickHandler">Click me</UButton>
        <UButton color="primary" @click="clickHandler">Click Me Too</UButton>
      </UCardBody>
    </UCard>
  </UContainer>
</template>
