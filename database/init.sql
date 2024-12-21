-- 创建数据库
CREATE DATABASE wfwwb;

-- 使用数据库
USE wfwwb;

-- 创建团队表
CREATE TABLE Team (
    TeamID VARCHAR(7) PRIMARY KEY,
    TeamName VARCHAR(50) NOT NULL,
    University VARCHAR(50) NOT NULL,
    TrackType ENUM('A', 'B') NOT NULL,
    SelectedTopicID VARCHAR(7) NULL
);

-- 创建团队成员表
CREATE TABLE TeamMember (
    MemberID INT PRIMARY KEY,
    TeamID VARCHAR(7) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Gender ENUM('Male', 'Female') NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    University VARCHAR(50) NOT NULL,
    Role ENUM('Captain', 'ViceCaptain', 'Member') NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID)
);

-- 创建指导教师表
CREATE TABLE Teacher (
    TeacherID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    University VARCHAR(50) NOT NULL
);

-- 创建团队-指导教师关系表
CREATE TABLE TeamTeacher (
    RelationID INT PRIMARY KEY,
    TeamID VARCHAR(7) NOT NULL,
    TeacherID VARCHAR(10) NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID),
    FOREIGN KEY (TeacherID) REFERENCES Teacher(TeacherID)
);

-- 创建A类赛题表
CREATE TABLE TopicA (
    TopicID VARCHAR(7) PRIMARY KEY,
    TopicName VARCHAR(100) NOT NULL,
    Company VARCHAR(50) NOT NULL
);

-- 创建B类赛题表
CREATE TABLE TopicB (
    TeamID VARCHAR(7) PRIMARY KEY,
    TopicName VARCHAR(100) NOT NULL,
    University VARCHAR(50) NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID)
);

-- 创建评审专家表
CREATE TABLE Expert (
    ExpertID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    University VARCHAR(50) NOT NULL,
    Title VARCHAR(50) NOT NULL,
    ResearchArea VARCHAR(100) NOT NULL
);

-- 创建初赛评审记录表
CREATE TABLE PreliminaryJudging (
    RecordID INT PRIMARY KEY,
    TeamID VARCHAR(7) NOT NULL,
    ExpertID VARCHAR(10) NOT NULL,
    Score DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID),
    FOREIGN KEY (ExpertID) REFERENCES Expert(ExpertID)
);

-- 创建决赛评审记录表
CREATE TABLE FinalJudging (
    RecordID INT PRIMARY KEY,
    TeamID VARCHAR(7) NOT NULL,
    ExpertID VARCHAR(10) NOT NULL,
    Score DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID),
    FOREIGN KEY (ExpertID) REFERENCES Expert(ExpertID)
);

-- 创建获奖证书表
CREATE TABLE AwardCertificate (
    CertificateID VARCHAR(20) PRIMARY KEY,
    TrackType ENUM('A', 'B') NOT NULL,
    AwardRank ENUM('1', '2', '3') NOT NULL,
    University VARCHAR(50) NOT NULL,
    StudentName VARCHAR(50) NOT NULL,
    StudentUniversity VARCHAR(50) NOT NULL,
    TeacherName VARCHAR(50) NOT NULL,
    TeacherUniversity VARCHAR(50) NOT NULL
);

-- 添加唯一性约束
ALTER TABLE Team ADD UNIQUE (TeamID);
ALTER TABLE TopicA ADD UNIQUE (TopicID);
ALTER TABLE TopicB ADD UNIQUE (TeamID);
ALTER TABLE AwardCertificate ADD UNIQUE (CertificateID);

-- 添加检查约束
ALTER TABLE Team ADD CHECK (TrackType IN ('A', 'B'));
ALTER TABLE TeamMember ADD CHECK (Role IN ('Captain', 'ViceCaptain', 'Member'));
ALTER TABLE Team ADD CHECK (CHAR_LENGTH(TeamID) = 7);
ALTER TABLE TeamMember ADD CHECK (CHAR_LENGTH(Phone) = 11);
ALTER TABLE Teacher ADD CHECK (CHAR_LENGTH(TeacherID) = 10);
ALTER TABLE Expert ADD CHECK (CHAR_LENGTH(ExpertID) = 10);

-- 创建管理员角色
CREATE ROLE Admin;

-- 创建普通用户角色
CREATE ROLE User;

-- 赋予管理员角色对整个数据库的所有权限
GRANT ALL PRIVILEGES ON wfwwb.* TO Admin;

-- 赋予普通用户角色对基本表的 SELECT、INSERT、UPDATE 权限
GRANT SELECT, INSERT, UPDATE ON wfwwb.Team TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.TeamMember TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.Teacher TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.TeamTeacher TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.TopicA TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.TopicB TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.Expert TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.PreliminaryJudging TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.FinalJudging TO User;
GRANT SELECT, INSERT, UPDATE ON wfwwb.AwardCertificate TO User;

-- 创建视图
CREATE VIEW UserTeamInfo AS
SELECT 
    t.TeamID,
    t.TeamName,
    t.University AS TeamUniversity,
    tm.Name AS MemberName,
    tm.Role AS MemberRole,
    tm.Gender AS MemberGender,
    tm.Phone AS MemberPhone,
    tm.University AS MemberUniversity
FROM Team t
JOIN TeamMember tm ON t.TeamID = tm.TeamID;

CREATE VIEW TeamJudgingInfo AS
SELECT 
    tm.TeamID AS TeamID,
    tm.Name AS TeamName,
    tm.TrackType AS TrackType,
    tm.SelectedTopicID AS SelectedTopicID,
    pj.Score AS PreliminaryScore,
    fj.Score AS FinalScore
FROM Team tm
JOIN PreliminaryJudging pj ON tm.TeamID = pj.TeamID
JOIN FinalJudging fj ON tm.TeamID = fj.TeamID;

CREATE VIEW UserAwardInfo AS
SELECT 
    ac.CertificateID,
    ac.TrackType,
    ac.AwardRank,
    ac.University,
    ac.StudentName,
    ac.StudentUniversity,
    ac.TeacherName,
    ac.TeacherUniversity
FROM AwardCertificate ac;

GRANT SELECT ON UserTeamInfo TO User;
GRANT SELECT ON UserJudgingInfo TO User;
GRANT SELECT ON UserAwardInfo TO User;

-- 创建管理员用户
CREATE USER 'admin_user' IDENTIFIED BY 'admin_password';
GRANT 'Admin' TO 'admin_user';
SET DEFAULT ROLE 'Admin' TO 'admin_user';

-- 创建普通用户
CREATE USER 'regular_user' IDENTIFIED BY 'user_password';
GRANT 'User' TO 'regular_user';
SET DEFAULT ROLE 'User' TO 'regular_user';

FLUSH PRIVILEGES;
