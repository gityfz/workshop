package com.metro.workshop.Entity;

/**
 * Created by qiujl on 2017/10/21.
 */
public class DataDict {
    private int id;
    private String dictKey;
    private String dictValue;
    private String dictWeight;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDictKey() {
        return dictKey;
    }

    public void setDictKey(String dictKey) {
        this.dictKey = dictKey;
    }

    public String getDictValue() {
        return dictValue;
    }

    public void setDictValue(String dictValue) {
        this.dictValue = dictValue;
    }

    public String getDictWeight() {
        return dictWeight;
    }

    public void setDictWeight(String dictWeight) {
        this.dictWeight = dictWeight;
    }
}
