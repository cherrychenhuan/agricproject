<template>
	<div class="system-user-dialog-container">
		<el-dialog center align-center v-model="state.isShow" width="769px" @close="dialogRefresh">
			<template #header="{ titleClass }">
				<div :class="titleClass">{{ state.title }}</div>
			</template>
			<el-form ref="formRef" :rules="state.rules" :model="state.formData" size="default" label-width="100px">
				<slot name="formPart">
					<div>表单内容</div>
				</slot>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit(formRef)" size="default">确认</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
 
<script setup lang="ts" name="myDialog">
import { ElMessage, FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
 
// 定义变量内容
const formRef = ref();
 
// 定义子组件向父组件传值/事件
const emit = defineEmits(['doSend']);
 
const state: any = reactive({
	isShow: false,
	formData: [],
	title: '',
	rules: {},
});
 
// 取消
const onCancel = () => {
	state.isShow = false;
};
 
// 提交
const onSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	//表格验证
	await formEl.validate(async (valid: any, fields: any) => {
		if (valid) {
			emit('doSend');
		} else {
			ElMessage.warning('表格项验证失败,请检查');
			console.log('表格项验证失败!', fields);
		}
	});
	onCancel();
};
 
const dialogRefresh = () => {
	// 清除校验规则
	formRef.value?.resetFields();
	// 重置表单内容
	state.formData = [];
};
 
/*
 *   formData：表单数据
 *   title：标题
 *   rules：表单校验规则
 */
const openDialog = (formData: object, title: string, rules: object) => {
	state.isShow = true;
	state.formData = formData;
	state.title = title;
	state.rules = rules;
};
 
// 暴露变量
defineExpose({
	openDialog,
});
</script>
<style scoped lang="scss">
:deep .el-dialog__header {
	width: 100%;
	height: 60px;
	background-color: #5e8dff;
}
 
:deep .el-dialog__header .el-dialog__title {
	font-size: 20px;
	color: #fff;
}
 
:deep .el-dialog__header .el-dialog__close {
	color: #fff;
}
</style>