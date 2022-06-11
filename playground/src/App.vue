<script setup lang="ts">
const formEl = ref(null);
const formData = reactive({
  age: "",
  name: "",
  country: "",
  address: "",
  rules: {
    age: [
      /* required */ (val) => !!val || "Required",
      /* number */ (val) => !isNaN(Number(val)) || "Expected number",
      /* length */ (val) =>
        val <= 18 ? "You are too young" : val >= 100 ? "You are too old" : "",
    ],
    name: [
      /* required */ (val) => !!val || "Required",
      /* length */ (val) => val.length > 2 || "Length needs to be more than 2",
    ],
  },
});

function submit() {
  /* eslint no-alert: "off" */
  if (formEl.value.getStatus()) {
    alert("Submission successful");
  } else {
    const msg = formEl.value
      .getErrorMsg()
      .map(({ prop, errorMsg }) => `${prop} is ${errorMsg}`)
      .join("\n");
    alert(msg);
  }
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <VividTyping
      content="Verify Form"
      :infinity="true"
      :interval="500"
      :stable="true"
      text-5xl
      m-t-10
      m-b-20
    />
    <div border="1px lightgray rounded" p10 ma w-300>
      <RegularForm
        ref="formEl"
        :form-data="formData"
        :inline="true"
        :initial-regular="false"
        @submit.prevent="submit"
      >
        <RegularFormField label="年龄" prop="age" required>
          <input v-model="formData.age" type="text" />
        </RegularFormField>
        <RegularFormField label="姓名" prop="name" required>
          <input v-model="formData.name" type="text" />
        </RegularFormField>
        <RegularFormField label="国籍" prop="country">
          <input v-model="formData.country" type="text" />
        </RegularFormField>
        <RegularFormField label="地址" prop="address">
          <input v-model="formData.address" type="text" />
        </RegularFormField>
        <div flex="~ gap-5" justify-center items-center m-t-5 w-full>
          <button btn type="submit">提交</button>
          <button btn type="button" @click="formEl.$reset()">清除错误</button>
          <button btn type="button" @click="formEl.$clear()">清空数据</button>
        </div>
      </RegularForm>
    </div>

    <Footer />
  </main>
</template>
