<template>
    <div>
        <div style="text-align: right"><el-button type="primary" @click="leaveChat">Home</el-button></div>
        <div style="width: 320px;height: 600px;margin: 30px auto;text-align: center">
        <h1>灵犀聊天室</h1>
        <div style="width: 320px;border: 1px solid gray;height: 300px;">
            <div style="width: 90px;height: 300px;float: left;text-align: left;">
                <p><span>当前在线:</span><span id="user_num">0</span></p>
                <div id="user_list" style="overflow: auto;">

                </div>
            </div>
            <div id="msg_list" style="width: 228px;border:  1px solid gray; height: 300px;overflow: scroll;float: left;text-align: left;">
            </div>
        </div>
        <br>
        <textarea id="msg_box" rows="6" cols="40" @keydown="confirm($event)"></textarea><br>
        <!-- <input type="button" value="发送" @click="send">&nbsp;&nbsp; -->
        <el-button type="primary" @click="send">发送</el-button>
        </div>

    </div>
</template>

<script>
    import {setCookie,getCookie} from '../../static/js/cookie.js'
    export default {
        data () {
            return {
                token: getCookie('lingxi-token'),
                username: '',
                ws: Object

            }
        },

        mounted () {
            const ws = new WebSocket("wss://www.nnbkqnp.cn:7996/websocket")
            this.ws = ws
            const username = getCookie('username')
            this.username = username
            console.log(username)
            console.log(ws)
            /**
             * 将数据转为json并发送
             * @param msg
             */
            function sendMsg(msg) {
                var data = JSON.stringify(msg);
                ws.send(data);
            }
            /**
             * 发送并清空消息输入框内的消息
             */
            function send() {
                var msg_box = document.getElementById("msg_box");
                var content = msg_box.value;
                var reg = new RegExp("\r\n", "g");
                content = content.replace(reg, "");
                var msg = {
                    'content': content.trim(),
                    'type': 'send'
                };
                sendMsg(msg);
                msg_box.value = '';
                // todo 清除换行符
            }

            function listMsg (data) {
                var msg_list = document.getElementById("msg_list");
                var msg = document.createElement("p");

                msg.innerHTML = data;
                msg_list.appendChild(msg);
                msg_list.scrollTop = msg_list.scrollHeight;
            }
            
            ws.onopen = function () {
                var data = '系统消息：建立连接成功'
                listMsg(data)
            }

            ws.onmessage = function(e) {
                console.log(e.data)
                var msg = JSON.parse(e.data);
                var sender, user_name, name_list, change_type;

                switch (msg.type) {
                    case 'system':
                        sender = '系统消息: ';
                        break;
                    case 'user':
                        sender = msg.from + ': ';
                        break;
                    case 'handshake':
                        var user_info = {
                            'type': 'login',
                            'content': username
                        };
                        sendMsg(user_info);
                        return;
                    case 'login':
                    case 'logout':
                        user_name = msg.content;
                        name_list = msg.user_list;
                        change_type = msg.type;
                        dealUser(user_name, change_type, name_list);
                        return;
                }

                var data = sender + msg.content;
                listMsg(data);
            };

            ws.onerror = function() {
                var data = "系统消息 : 出错了,请退出重试.";
                listMsg(data);
            }

            //窗口关闭时，发信息给服务器，说明下线了
            // window.onbeforeunload = function() {　　
            //     var user_info = {
            //         'type': 'logout',
            //         'content': this.username
            //     };
            //     sendMsg(user_info);
            //     this.ws.close();
            // }

            function confirm(event) {
                var key_num = event.keyCode;
                if (13 == key_num) {
                    send();
                } else {
                    return false;
                }
            }

            /**
             * 处理用户登陆消息
             *
             * @param user_name 用户名
             * @param type  login/logout
             * @param name_list 用户列表
             */
            function dealUser(user_name, type, name_list) {
                var user_list = document.getElementById("user_list");
                var user_num = document.getElementById("user_num");
                while (user_list.hasChildNodes()) {
                    user_list.removeChild(user_list.firstChild);
                }

                for (var index in name_list) {
                    var user = document.createElement("p");
                    user.innerHTML = name_list[index];
                    user_list.appendChild(user);
                }
                user_num.innerHTML = name_list.length;
                user_list.scrollTop = user_list.scrollHeight;

                var change = type == 'login' ? '上线' : '下线';

                var data = '系统消息: ' + user_name + ' 已' + change;
                listMsg(data);
            }

            this.$once('hook:beforeDestroy', ()=>{
                var user_info = {
                    'type': 'logout',
                    'content': this.username
                };
                this.sendMsg(user_info);
                this.ws.close();
            })

        },

        methods: {
            sendMsg(msg) {
                var data = JSON.stringify(msg);
                this.ws.send(data);
            },
            /**
             * 发送并清空消息输入框内的消息
             */
            send() {
                console.log(this.username)
                var msg_box = document.getElementById("msg_box");
                var content = msg_box.value;
                var reg = new RegExp("\r\n", "g");
                content = content.replace(reg, "");
                var msg = {
                    'content': content.trim(),
                    'type': 'send'
                };
                this.sendMsg(msg);
                msg_box.value = '';
                // todo 清除换行符
            },

            confirm(event) {
                var key_num = event.keyCode;
                if (13 == key_num) {
                    this.send();
                } else {
                    return false;
                }
            },

            leaveChat () {
                // var user_info = {
                //     'type': 'logout',
                //     'content': this.username
                // };
                // this.sendMsg(user_info);
                // this.ws.close();
                this.$router.push({'path': '/main/home'})
                // window.opener = null
                // window.open("about:blank", "_top").close()
                // this.$router.push({'path': '/main/home'})

            }

        }

    }
</script>

<style>

</style>