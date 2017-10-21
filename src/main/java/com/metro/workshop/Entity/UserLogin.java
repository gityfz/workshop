package com.metro.workshop.Entity;

import java.util.Date;

/**
 * Created by qiujl on 2017/10/20.
 */
public class UserLogin {
    private int id;
    private String employeeId;
    private String password;
    private String salt;
    private int delFlag;//0:活跃账户;1:已删除账户
    private Date setTime;
    private Date updateTime;


    public void setDelFlag(int delFlag) {
        this.delFlag = delFlag;
    }

    public Date getSetTime() {
        return setTime;
    }

    public void setSetTime(Date setTime) {
        this.setTime = setTime;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
