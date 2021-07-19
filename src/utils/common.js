      //NickPattern 用户昵称正则：限16个字符，支持中英文、数字、减号或下划线
      const NickPattern = "^[\u4e00-\u9fa5_a-zA-Z0-9-]{1,16}$";

      //UserPattern 用户名正则，4到16位（字母，数字，下划线）
      const UserPattern = "^[a-zA-Z0-9_]{4,16}$";

      //PassPattern 长度在6~18之间，只能包含字母、数字和下划线
      const PassPattern ="^[a-zA-Z0-9_]{5,17}$";

      


      export default {
        nickname:NickPattern,username:UserPattern,password:PassPattern
      }
      