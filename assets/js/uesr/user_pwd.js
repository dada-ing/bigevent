$(function(){
    var form = layui.form
    
    //位密码框定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6～12位， 且不能出现空格'],
        samePwd: function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        rePwd: function(value){
            if(value != $('[name=newPwd]').val()){
                return '两次密码不一致'
            }
        }
    })

    //给表单绑定事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新密码成功')
                
                // 重置表单  reset是表单域元素的原生方法 所以要先把jquery获取元素之后转成原生
                $('.layui-form')[0].reset()
            }
        })
    })
})