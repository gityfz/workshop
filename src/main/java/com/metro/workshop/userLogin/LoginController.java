package com.metro.workshop.userLogin;

import com.metro.workshop.Entity.User;
import com.metro.workshop.Utils.HostHolder;
import com.metro.workshop.Utils.wkUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by qiujl on 2017/10/18.
 */
@Controller
@RequestMapping
public class LoginController {

    @Autowired
    LoginService loginService;

    @Autowired
    private HostHolder hostHolder;

    @RequestMapping
    public String  homepage(HttpServletRequest request,HttpServletResponse response){
        if(hostHolder.getUser()!=null){
            return "index";
        }
        return "login";
    }


    @RequestMapping(path = {"/login/"}, method = {RequestMethod.POST})
    public String login(
            Model model, @RequestParam("login") String emloyeeId,
                      @RequestParam("password") String password,
                      @RequestParam(value="rember", defaultValue = "0") int rem, HttpServletResponse response
    ){
        Map<String,Object> map=new HashMap<String,Object>();
        map=loginService.login(emloyeeId,password);
        if(map.containsKey("token")){
            Cookie cookie=new Cookie("token",map.get("token").toString());
            cookie.setPath("/");
            if (rem > 0) {//最大存活天数
                cookie.setMaxAge(3600 * 24 * 5);
            }
            response.addCookie(cookie);
            User user=(User)map.get("user");
            cookie=new Cookie("login",user.getEmployeeLevel());

            return "index";
        }else{
            return "login";
        }
    }

//    @RequestMapping(path = {"/logout/"}, method = {RequestMethod.GET, RequestMethod.POST})
//    public String logout(@CookieValue("token") String token) {
//        loginService.logout(token);
//        return "redirect:/";
//    }
//
//    @RequestMapping(path = {"/reg/"}, method = {RequestMethod.GET, RequestMethod.POST})
//    @ResponseBody
//    public String register(Model model, @RequestParam("username") String username,
//                           @RequestParam("password") String password,
//                           @RequestParam(value="rember", defaultValue = "0") int rememberme,
//                           HttpServletResponse response) {
//        //Map<String, Object> map = userService.register(username, password);
//        try {
//            Map<String, Object> map = userService.register(username, password);
//            if (map.containsKey("ticket")) {
//                Cookie cookie = new Cookie("ticket", map.get("ticket").toString());
//                cookie.setPath("/");//所有路径下
//                if (rememberme > 0) {//最大存活天数
//                    cookie.setMaxAge(3600 * 24 * 5);
//                }
//                response.addCookie(cookie);
//                return wkUtils.getJSONString(0, "注册成功");
//            }else {
//                return wkUtils.getJSONString(1, map);
//            }
//        }catch(Exception e){ logger.error("注册异常" + e.getMessage());
//            return ToutiaoUtils.getJSONString(1, "注册异常");
//        }
//    }
//    @RequestMapping(path = {"/login/"}, method = {RequestMethod.GET, RequestMethod.POST})
//    @ResponseBody
//    public String login(Model model, @RequestParam("username") String username,
//                        @RequestParam("password") String password,
//                        @RequestParam(value="rember", defaultValue = "0") int rememberme,HttpServletResponse response){
//        Map<String,Object> map=new HashMap<String,Object>();
//        map=userService.login(username,password);
//        if(map.containsKey("ticket")){
//            Cookie cookie=new Cookie("ticket",map.get("ticket").toString());
//            cookie.setPath("/");
//            if (rememberme > 0) {//最大存活天数
//                cookie.setMaxAge(3600 * 24 * 5);
//            }
//            response.addCookie(cookie);
//            return ToutiaoUtils.getJSONString(0, map);
//        }else{
//            return ToutiaoUtils.getJSONString(1, map);
//        }
//    }
}
