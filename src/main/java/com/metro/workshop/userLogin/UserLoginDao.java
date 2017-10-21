package com.metro.workshop.userLogin;

import com.metro.workshop.Entity.User;
import com.metro.workshop.Entity.UserLogin;
import org.apache.ibatis.annotations.*;

/**
 * Created by qiujl on 2017/10/18.
 */
@Mapper
public interface UserLoginDao {

    String TABLE_NAME1 = "userlogin";
    String SELECT = "select";
    String UPDATE = "update";
    String INSERT = "insert into";

    String INSERT_FIELDS = " employee_id, password, salt, del_flag, set_time, update_time ";

    String SELECT_FIELDS = " id, employee_id, password, salt, del_flag, set_time, update_time ";

    @Insert({
            INSERT, TABLE_NAME1, "(", INSERT_FIELDS,
            ") Values (#{employeeId}, #{password}, #{salt}, #{delFlag},#{setTime}, #{updateTime})"
    })
    int addUserLogin(UserLogin userLogin);

    @Select({SELECT, SELECT_FIELDS, "from ", TABLE_NAME1, " where employee_id=#{employeeId}"})
    UserLogin selsectUserLoginForUserId(String employeeId);

    @Update({UPDATE , TABLE_NAME1, " set password = #{password} where employee_id=#{employeeId}"})
    public void updateUserLoginPassword(UserLogin userLogin);

    @Update({UPDATE , TABLE_NAME1, " set del_flag = 1 where employee_id=#{employeeId}"})
    public void deleteUserLogin(User user);

    @Update({UPDATE , TABLE_NAME1, " set del_flag = 1 where employee_id=#{employeeId}"})
    public void deleteUserLoginByUserId(String employeeId);

}
