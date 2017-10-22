package com.metro.workshop.Entity;

import java.util.Date;

/**
 * Created by qiujl on 2017/10/21.
 */
public class WorkrRecord {
    private int id;
    private String workRecordId;
    private String employeeId;
    private int recordMonth;
    private String noteMessage;
    private int commitFlag;//0:仍在编辑状态；1：确认提交
    private int delFlag;//0:存在;1:已删除
    private Date setTime;
    private Date updateTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWorkRecordId() {
        return workRecordId;
    }

    public void setWorkRecordId(String workRecordId) {
        this.workRecordId = workRecordId;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public int getRecordMonth() {
        return recordMonth;
    }

    public void setRecordMonth(int recordMonth) {
        this.recordMonth = recordMonth;
    }

    public String getNoteMessage() {
        return noteMessage;
    }

    public void setNoteMessage(String noteMessage) {
        this.noteMessage = noteMessage;
    }

    public int getCommitFlag() {
        return commitFlag;
    }

    public void setCommitFlag(int commitFlag) {
        this.commitFlag = commitFlag;
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
