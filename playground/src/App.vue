<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <Form @submit.prevent="submit" :formData="formData" ref="formEl">
      <FormField label="年龄" prop="age">
        <input type="text" v-model="formData.age" />
      </FormField>
      <FormField label="姓名" prop="name">
        <input type="text" v-model="formData.name" />
      </FormField>

      <div flex="~ gap-5" justify-center items-center>
        <button btn type="submit">提交</button>
        <button btn type="button" @click="formEl.$reset()">清除错误</button>
        <button btn type="button" @click="formEl.$clear()">清空数据</button>
      </div>
    </Form>
    <Footer />
  </main>
</template>

<script setup lang="ts">
const formEl = ref(null);
const formData = reactive({
  age: "222",
  name: "simon",
  rule: {
    age: [
      /* required */ (val) => !!val || "Required",
      /* number */ (val) => !isNaN(Number(val)) || "Expected number",
      /* length */ (val) => val.length < 3 || "Length needs to be less than 3",
    ],
    name: [
      /* required */ (val) => !!val || "Required",
      /* length */ (val) => val.length < 4 || "Length needs to be less than 4",
    ],
  },
});
onMounted(() => {
  console.log(formEl.value);
});
function submit() {
  if (formEl.value.getStatus()) {
    console.log("submit");
  } else {
    console.log("can't submit");
  }
}
</script>
