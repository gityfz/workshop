package com.metro.workshop.Entity;

/**
 * Created by qiujl on 2017/10/21.
 */
public class DutyDetail {
    private int id;
    private String workRecordId;
    private String workType;
    private double workAmount;

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

    public String getWorkType() {
        return workType;
    }

    public void setWorkType(String workType) {
        this.workType = workType;
    }

    public double getWorkAmount() {
        return workAmount;
    }

    public void setWorkAmount(double workAmount) {
        this.workAmount = workAmount;
    }
}
