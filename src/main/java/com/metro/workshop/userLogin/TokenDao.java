package com.metro.workshop.userLogin;

import com.metro.workshop.Entity.Token;
import org.apache.ibatis.annotations.*;

/**
 * Created by qiujl on 2017/10/21.
 */
@Mapper
public interface TokenDao {
    String TABLE_NAME = "token";
    String INSERT_FIELDS = " employee_id,login_time,token,status";
    String SELECT_FIELDS = "id ," + INSERT_FIELDS;

    @Insert({"insert into ", TABLE_NAME, "(", INSERT_FIELDS,
            ") values (#{employeeId},#{loginTime},#{token},#{status})"})
    int addToken(Token token);

    @Select({"select ", SELECT_FIELDS, " from ", TABLE_NAME, " where token=#{token}"})
    Token selectByToken(String token);

    @Select({"select ", SELECT_FIELDS, " from ", TABLE_NAME, " where status=0 and employee_id=#{employeeId}"})
    Token selectByEmployeeId(String employeeId);

    @Update({"update ", TABLE_NAME, " set status=1 where token=#{token}"})
    void updateStatus(String token);

    @Update({"update ", TABLE_NAME, " set status=1 where status=0 and employee_id=#{employeeId}"})
    void updateStatusByEmployeeId(String employeeId);
}
