package com.metro.workshop.Entity;


import java.util.Date;

/**
 * Created by qiujl on 2017/10/21.
 */
public class Token {

    private int id;

    private String employeId;

    private Date loginTime;

    private String token;

    private int status;//0:在线；1:过期

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmployeId() {
        return employeId;
    }

    public void setEmployeId(String employeId) {
        this.employeId = employeId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
