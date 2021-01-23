$(function () {
    var form = layui.form
    var layer = layui.layer


    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1～6个字符之间'
            }
        }
    })

    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // layui快速给表单赋值 需要给对应的form 表单添加 lay-filter 属性
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单的数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        //当点了重置按钮后 又发起一次 ajax 请求
        initUserInfo()
    })


    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')

                // 在子页面中调用父页面的方法  重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})