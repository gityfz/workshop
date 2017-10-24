package com.metro.workshop.userLogin;

import com.metro.workshop.Entity.User;
import com.metro.workshop.Entity.UserLogin;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * Created by qiujl on 2017/10/21.
 */

@Mapper
public interface UserDao {
    String TABLE_NAME1 = "user";
    String SELECT = "select";
    String UPDATE = "update";
    String INSERT = "insert into";

    String INSERT_FIELDS = " employee_id, head_url, employee_name, employee_sex, employee_type, employee_level,employee_describe,group_id,del_flag,set_time,update_time ";

    String SELECT_FIELDS = " id, "+INSERT_FIELDS;

    @Insert({
            INSERT, TABLE_NAME1, "(", INSERT_FIELDS,
            ") Values (#{employeeId}, #{hearUrl}, #{employeeName}, #{employeeSex},#{employeeType}, #{employeeLevel}, #{employeeDescribe}, #{groupId}, #{delFlag},#{setTime}, #{updateTime})"
    })
    int addUser(UserLogin userLogin);

    @Select({SELECT, SELECT_FIELDS, "from ", TABLE_NAME1, " where employee_id=#{employeeId}"})
    User selsectUserForUserId(String employeeId);

    @Update({UPDATE , TABLE_NAME1, " set employee_level = #{employeeLevel} where employee_id=#{employeeId}"})
    public void updateUserEmployeeLevel(User user);

    @Update({UPDATE , TABLE_NAME1, " set group_id = #{groupId} where employee_id=#{employeeId}"})
    public void updateUserGroupId(User user);

    @Update({UPDATE , TABLE_NAME1, " set del_flag = 1 where employee_id=#{employeeId}"})
    public void deleteUser(User user);

    @Update({UPDATE , TABLE_NAME1, " set del_flag = 1 where employee_id=#{employeeId}"})
    public void deleteUserByUserId(String employeeId);
}
