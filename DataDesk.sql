USE [DataDesk]
GO
/****** Object:  Table [dbo].[ActivityLog]    Script Date: 20-02-2020 17:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActivityLog](
	[ActivityCode] [int] IDENTITY(1,1) NOT NULL,
	[IPAddress] [varchar](50) NOT NULL,
	[UserID] [varchar](30) NOT NULL,
	[URL] [varchar](300) NOT NULL,
	[DeviceType] [varchar](30) NOT NULL,
	[OS] [varchar](30) NOT NULL,
	[Browser] [varchar](300) NOT NULL,
	[DateTime] [datetime2](3) NOT NULL,
	[Action] [varchar](30) NOT NULL,
	[Attack] [varchar](30) NOT NULL,
	[Mode] [varchar](10) NOT NULL,
 CONSTRAINT [PK_ActivityLog] PRIMARY KEY CLUSTERED 
(
	[ActivityCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserLogin]    Script Date: 20-02-2020 17:12:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserLogin](
	[UserID] [varchar](50) NOT NULL,
	[PasswordHash] [nvarchar](100) NOT NULL,
	[ContactNo] [varchar](10) NULL,
	[EmailID] [varchar](50) NULL,
	[DateTime] [datetime2](3) NOT NULL,
	[IPAddress] [varchar](50) NOT NULL,
	[FinancialYear] [varchar](10) NOT NULL,
 CONSTRAINT [PK_UserLogin] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ActivityLog] ON 

INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (1, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-11T14:32:56.2700000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (2, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-11T14:34:07.2530000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (3, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-11T14:59:40.9730000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (4, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-11T15:06:32.3530000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (5, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-11T15:23:32.7830000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (6, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-11T17:05:00.1070000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (7, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-12T16:58:55.9730000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (8, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-12T19:39:08.3970000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (9, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-12T19:42:30.0570000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (10, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-12T19:44:56.5070000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (11, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-12T19:55:30.1930000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (12, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36', CAST(N'2020-02-12T20:03:10.6900000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (13, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36', CAST(N'2020-02-13T11:07:47.8400000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (14, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36', CAST(N'2020-02-13T11:11:58.5300000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (15, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36', CAST(N'2020-02-13T11:14:57.8700000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (16, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36', CAST(N'2020-02-13T11:16:11.3900000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (17, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36', CAST(N'2020-02-13T11:41:21.6800000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (18, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36', CAST(N'2020-02-13T11:53:50.1500000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (19, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36', CAST(N'2020-02-19T11:49:16.6170000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (20, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36', CAST(N'2020-02-19T15:27:57.4730000' AS DateTime2), N'/login', N'LOGIN', N'POST')
INSERT [dbo].[ActivityLog] ([ActivityCode], [IPAddress], [UserID], [URL], [DeviceType], [OS], [Browser], [DateTime], [Action], [Attack], [Mode]) VALUES (21, N'::1', N'ADMIN', N'http://localhost:3000/', N'DESKTOP', N'win32', N'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36', CAST(N'2020-02-19T17:44:33.0370000' AS DateTime2), N'/login', N'LOGIN', N'POST')
SET IDENTITY_INSERT [dbo].[ActivityLog] OFF
INSERT [dbo].[UserLogin] ([UserID], [PasswordHash], [ContactNo], [EmailID], [DateTime], [IPAddress], [FinancialYear]) VALUES (N'ADMIN', N'849f1575ccfbf3a4d6cf00e6c5641b7fd4da2ed3e212c2d79ba9161a5a432ff0', NULL, NULL, CAST(N'2020-02-06T00:00:00.0000000' AS DateTime2), N'::1', N'2019-20')
