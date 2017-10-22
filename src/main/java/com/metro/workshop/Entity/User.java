package com.metro.workshop.Entity;

import java.util.Date;

/**
 * Created by qiujl on 2017/10/18.
 */
public class User {
    private int id;
    private int employeeId;
    private String hearUrl;
    private String employeeName;
    private String employeeSex;//0：男性;1：女性
    private String employeeType;
    private String employeeLevel;//权限级别0~4表示五种权限等级（冗余）
    private String employeeDescribe;
    private int group_id;
    private int delFlag;//0:存在;1:已删除
    private Date setTime;
    private Date updateTime;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getHearUrl() {
        return hearUrl;
    }

    public void setHearUrl(String hearUrl) {
        this.hearUrl = hearUrl;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeSex() {
        return employeeSex;
    }

    public void setEmployeeSex(String employeeSex) {
        this.employeeSex = employeeSex;
    }

    public String getEmployeeType() {
        return employeeType;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public String getEmployeeLevel() {
        return employeeLevel;
    }

    public void setEmployeeLevel(String employeeLevel) {
        this.employeeLevel = employeeLevel;
    }

    public String getEmployeeDescribe() {
        return employeeDescribe;
    }

    public void setEmployeeDescribe(String employeeDescribe) {
        this.employeeDescribe = employeeDescribe;
    }

    public int getGroup_id() {
        return group_id;
    }

    public void setGroup_id(int group_id) {
        this.group_id = group_id;
    }

    public int getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(int delFlag) {
        this.delFlag = delFlag;
    }

    public Date getSetTime() {
        return setTime;
    }

    public void setSetTime(Date setTime) {
        this.setTime = setTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
