<script>
	
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
	/* @import url("~@/pages/style/main.css"); */
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */

@font-face {
	font-family: uniicons;
	src: url('-@/static/uni.ttf');
}
/* #endif */
	
</style>
