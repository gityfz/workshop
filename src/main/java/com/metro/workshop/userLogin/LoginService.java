package com.metro.workshop.userLogin;

import com.metro.workshop.Entity.Token;
import com.metro.workshop.Entity.User;
import com.metro.workshop.Entity.UserLogin;
import com.metro.workshop.Utils.wkUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Created by qiujl on 2017/10/18.
 */
@Service
public class LoginService {

    @Autowired
    UserLoginDao userlogindao;

    @Autowired
    UserDao userdao;

    @Autowired
    TokenDao tokendao;

//    public Employee getEmployee(int id) {
//        return employeedao.selectById(id);
//    }
//
//    public User getUserByName(String name) {
//        return userdao.selectByName(name);
//    }
//    public Map<String,Object> register(String name, String password){
//        Map<String,Object > map=new HashMap<String,Object>();
//
//        if(StringUtils.isBlank(name)){
//            map.put("msgname","用户名不能为空");
//            return map;
//        }else if(StringUtils.isBlank(password)){
//            map.put("msgpsw","密码不能为空");
//            return map;
//        }
//
//        //判断username是否被注册了
//        if(userdao.selectByName(name)!=null){
//            map.put("msgname","该用户已经被注册");
//            return map;
//        }
//
//        //注册
//        User user=new User();
//        user.setName(name);
//        String head = String.format("http://images.nowcoder.com/head/%dt.png", new Random().nextInt(1000));
//        user.setHeadUrl(head);
//        //进行salt加密
//        user.setSalt(UUID.randomUUID().toString().substring(0,5));
//        password=password+user.getSalt();
//        user.setPassword(ToutiaoUtils.MD5(password));
//        userdao.addUser(user);
//
//        // 登陆
//        String ticket = addLoginTicket(user.getId());
//        map.put("ticket", ticket);
//        return map;
//    }

    public Map<String,Object> login(String employeeId, String password){
        Map<String,Object > map=new HashMap<String,Object>();

        if(StringUtils.isBlank(employeeId)){
            map.put("employeeId","用户名不能为空");
            return map;
        }else if(StringUtils.isBlank(password)){
            map.put("password","密码不能为空");
            return map;
        }
        UserLogin userLogin=new UserLogin();
        User user=new User();
        userLogin=userlogindao.selsectUserLoginForUserId(employeeId);
        if(userLogin==null){
            map.put("msgnuser","该用户不存在");
            return map;
        }else if(!wkUtils.MD5(password+userLogin.getSalt()).equals(userLogin.getPassword())){
            map.put("msgpsw","该密码不正确");
            return map;
        }
        user=userdao.selsectUserForUserId(employeeId);
        // 登陆
        if(tokendao.selectByEmployeeId(employeeId)!=null){
            tokendao.updateStatusByEmployeeId(employeeId);
        }
        String token = addLoginTicket(employeeId);
        map.put("user",user);
        map.put("token", token);
        return map;
    }

    private String addLoginTicket(String employeeId) {

        Token token = new Token();
        token.setEmployeeId(employeeId);
        Date date = new Date();
        date.setTime(date.getTime() + 1000*3600*24);
        token.setLoginTime(date);
        token.setStatus(0);//0为有效

        //设置token
        token.setToken(UUID.randomUUID().toString().replaceAll("-", ""));
        tokendao.addToken(token);

        return token.getToken();
    }

    public void logout(String token) {
        tokendao.updateStatus(token);
    }
}
