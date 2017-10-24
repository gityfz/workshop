package com.metro.workshop.Entity;

import javax.xml.crypto.Data;
import java.util.Date;

/**
 * Created by qiujl on 2017/10/21.
 */
public class Group {
    private int id;
    private String groupId;//班组编码
    private String workshopId;
    private int groupHc;//班组人数
    private String group_describe;
    private int delFlag;
    private Date setTime;
    private Date updateTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getWorkshopId() {
        return workshopId;
    }

    public void setWorkshopId(String workshopId) {
        this.workshopId = workshopId;
    }

    public int getGroupHc() {
        return groupHc;
    }

    public void setGroupHc(int groupHc) {
        this.groupHc = groupHc;
    }

    public String getGroup_describe() {
        return group_describe;
    }

    public void setGroup_describe(String group_describe) {
        this.group_describe = group_describe;
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
