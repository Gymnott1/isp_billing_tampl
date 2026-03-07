<script setup>defineProps(['title'])</script>
<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">{{ title }}</h1>
    <div class="border-2 border-dashed border-zinc-800 rounded-xl h-64 flex items-center justify-center text-zinc-500">
      Content for {{ title }} goes here...
    </div>
  </div>
</template>