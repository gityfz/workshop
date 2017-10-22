package com.metro.workshop.Interceptor;

import com.metro.workshop.Entity.Token;
import com.metro.workshop.Entity.User;
import com.metro.workshop.Utils.HostHolder;
import com.metro.workshop.userLogin.UserDao;
import com.metro.workshop.userLogin.TokenDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 * Created by qiujl on 2017/10/21.
 */
@Component
public class PassportInterceptor implements HandlerInterceptor {
    @Autowired
    UserDao userDao;

    @Autowired
    TokenDao tokenDao;
    @Autowired
    private HostHolder hostHolder;

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        String ticket=null;

        if(httpServletRequest.getCookies()!=null) {
            for(Cookie cookie :httpServletRequest.getCookies()){
                if(cookie.getName().equals("token")){
                    ticket=cookie.getValue();
                    break;
                }
            }
        }

        if(ticket!=null){
            Token token = tokenDao.selectByToken(ticket);
            if (token == null || token.getLoginTime().before(new Date()) || token.getStatus() != 0) {
                return true;
            }

            User user = userDao.selsectUserForUserId(token.getEmployeId());
            hostHolder.setUser(user);
        }

        return true;


    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        if (modelAndView != null && hostHolder.getUser() != null) {
            modelAndView.addObject("user", hostHolder.getUser());
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        hostHolder.clear();

    }
}
