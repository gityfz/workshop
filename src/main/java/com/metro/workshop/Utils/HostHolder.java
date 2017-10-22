package com.metro.workshop.Utils;

import com.metro.workshop.Entity.User;
import org.springframework.stereotype.Component;

/**
 * Created by qiujl on 2017/10/21.
 */
@Component
public class HostHolder {
    private static ThreadLocal<User> users=new ThreadLocal<User>();

    public User getUser(){
        return users.get();
    }
    public void setUser(User user){
        users.set(user);
    }

    public void clear(){
        users.remove();
    }
}
