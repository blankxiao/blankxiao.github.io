---
title: Linux笔记总结
date: 2024-08-28
summary: 总结了关于linux的常用命令
tags: [Linux]
category:
comments: true
draft: false
lastMod:
cover:
sticky: 0
---

## 文件操作

**`ls`** - 列出目录内容。
**`cd`** - 更改当前工作目录。
**`pwd`** - 显示当前工作目录的路径。
**`mkdir`** - 创建新目录。
**`find`** - 文件查找

```sh
find directory -name "*.txt"
find directory -name syslog
# 查找七天前被修改的文件
find /var/log -name "*.log" -mtime +7
```

```sh
mkdir new_directory
```

**`rmdir`** - 删除空目录。

```sh
rmdir empty_directory
```

**`rm`** - 删除文件或目录。

```sh
   rm file_or_directory
```

**`cp`** - 复制文件或目录。copy

```sh
cp source destination
```

**`mv`** - 移动或重命名文件或目录。

```sh
mv source destination
```

**`touch`** - 创建空文件或更新文件时间戳。

```sh
touch new_file
```

**`cat`** - 显示文件内容。

```sh
cat file
```

### 压缩

**`tar`** - 打包和解包文件。

```sh
tar -cvf archive.tar files
tar -xvf archive.tar
```

**`gzip`** - 压缩文件。

```sh
gzip file
gunzip file.gz
```

## 权限

`ls -l file`显示文件权限
**`chmod`** - 更改文件或目录的权限。 添加`-R`递归改变权限

```sh
    chmod 755 file_or_directory
```

**`chown`** - 更改文件或目录的所有者。

```sh
    chown user:group file_or_directory
```

**`chgrp`** - 更改文件或目录的组。

```sh
    chgrp group file_or_directory
```

### 用户

添加用户
**`useradd`** - 添加新用户。

```sh
useradd new_user
# -m 添加文件夹 --create-home
# -j 添加默认组 --gid
sudo useradd -m -g developers johndoe

```

设置用户密码
**`passwd`** - 设置或更改用户的密码。

```sh
passwd new_user
```

修改用户属性
**`usermod`** - 修改用户的属性。

```sh
usermod -aG group_name user_name  # 将用户添加到附加组
usermod -s /bin/bash user_name    # 更改用户的默认 shell
usermod -c "User Comment" user_name  # 更改用户的注释信息
```

删除用户
**`userdel`** - 删除用户。

```sh
userdel user_name
```

显示所有用户
**`cat /etc/passwd`** - 显示所有用户的详细信息。

```sh
cat /etc/passwd
```

显示用户信息
**`id`** - 显示用户的 UID、GID 和所属组。

```sh
id user_name
```

切换用户
**`su`** - 切换到另一个用户。

```sh
su - user_name
```

以 root 用户身份执行命令
**`sudo`** - 以超级用户（root）身份执行命令。

```sh
sudo command
```

显示当前用户
**`whoami`** - 显示当前登录的用户名。

```sh
whoami
```

### 组

添加用户组
**`groupadd`** - 添加新用户组。

```sh
groupadd new_group
```

修改用户组
**`groupmod`** - 修改用户组的属性。

```sh
groupmod -n new_group_name old_group_name  # 更改组名
```

删除用户组
**`groupdel`** - 删除用户组。

```sh
groupdel group_name
```

显示所有用户组
**`cat /etc/group`** - 显示所有用户组的详细信息。

```sh
cat /etc/group
```

## 进程管理

**`ps`(Process Status)** - 显示当前进程的状态。

```sh
ps
```

**`top`(Table of Processes)** - 实时显示系统资源使用情况和进程信息。

```sh
top
```

`netstat -tuln | grep ${port_number}`查看某个端口的信息
Network Statistics

1. **`-t`**: TCP（传输控制协议）
   - 显示 TCP 协议的连接。
2. **`-u`**: UDP（用户数据报协议）
   - 显示 UDP 协议的连接。
3. **`-l`**: Listening（监听）
   - 显示监听的端口。
4. **`-n`**: Numeric（数字）- 显示数字形式的地址和端口号，而不是尝试解析服务名称。
   `|`将上一个命令的输出作为下一个命令的输入
   **`grep`**: Global Regular Expression Print（全局正则表达式打印）

`lsof -i :5000`
List Open Files（列出打开的文件）
**`-i`**: Internet（互联网）

**`kill`** - 终止进程。

```sh
kill process_id
```

**`df`(Disk Free)** - 显示磁盘空间使用情况。

```sh
df -h
```

**`du`(Disk Usage)** - 显示目录或文件的磁盘使用情况。

```sh
du -h directory
```

`-h` human-readable

## 网络连接

**`wget`** - 从网络下载文件。

```sh
wget http://example.com/file
```

**`curl`** - 传输数据，支持多种协议。

```sh
curl http://example.com
```

**`ssh`** - 安全地连接到远程服务器。

```sh
ssh user@remote_host
```

**`scp`** - 安全地复制文件到远程服务器或从远程服务器复制文件。

```sh
scp file user@remote_host:/path
```

**`rsync`** - 同步文件和目录，支持增量备份。

```sh
rsync -av source destination
```

## 命令帮助

**`history`** - 显示命令历史记录。

```sh
history
```

**`man`** - 显示命令的手册页。

```sh
man command
```

## 配置

### 环境变量配置

通过编辑用户的 shell 配置文件（如 `.bashrc`, `.zshrc`）来添加或修改 `PATH` 变量。

- 例如，添加 Python 解释器路径：
  ```sh
  export PATH=$PATH:/usr/local/bin/python3
  ```

### 软件安装

使用包管理器（如 `apt`, `yum`, `pacman`）来安装软件。

- 例如，安装 Python：
  ```sh
  sudo apt install python3
  ```

### 服务管理

使用 `systemctl` 或 `service` 命令来管理服务。

- 例如，启动或停止服务：

```sh
    sudo systemctl start service_name
    sudo systemctl stop service_name
    sudo systemctl status service_name
```

### 网络配置

使用 `ifconfig`, `ip`, `netplan` 等命令来配置网络。

- 例如，配置网络：

```sh
    sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0
```

在 Linux 系统中，文件和目录的权限分为三类：用户（User）、组（Group）和其他（Others）。每类权限又分为读（Read）、写（Write）和执行（Execute）三种权限。以下是各个权限的具体内容：
xxx-xxx-xxx
771

### 数字介绍

在 Linux 系统中，文件和目录的权限使用一个三位八进制数来表示，每个数字对应一组权限（用户、组、其他）。每个权限位可以是读（r）、写（w）、执行（x）或无权限（-）。这些权限位对应的数字如下：

- **读 (r)**：对应数字 4
- **写 (w)**：对应数字 2
- **执行 (x)**：对应数字 1
- **无权限 (-)**：对应数字 0

将这些数字相加，可以得到一个八进制数，表示一组权限。例如：

- `rwx`（读、写、执行）对应数字 7（4 + 2 + 1）
- `rw-`（读、写）对应数字 6（4 + 2）
- `r-x`（读、执行）对应数字 5（4 + 1）
- `r--`（读）对应数字 4
- `-wx`（写、执行）对应数字 3（2 + 1）
- `-w-`（写）对应数字 2
- `--x`（执行）对应数字 1
- `---`（无权限）对应数字 0
  从左到有代表用户、组、其他，即文件的所有者，文件所有者属于的组，和文件所有者无关的用户
  通过这种方式，可以方便地将权限字符串转换为八进制数，并在使用 `chmod` 命令时直接设置权限。例如：

```sh
chmod 644 myfile.txt
chmod 755 myscript.sh
chmod 700 mydir
```

### 文件权限

1. **读权限 (r)**：
   - 允许用户查看文件内容。
   - 使用 `cat`、`less`、`more` 等命令查看文件。
2. **写权限 (w)**：
   - 允许用户修改文件内容。
   - 使用 `vi`、`nano`、`echo` 等命令编辑文件。
3. **执行权限 (x)**：
   - 允许用户执行文件（如果文件是可执行程序或脚本）。
   - 使用 `./file` 运行脚本或程序。

### 目录权限

1. **读权限 (r)**：
   - 允许用户列出目录内容。
   - 使用 `ls` 命令查看目录中的文件和子目录。
2. **写权限 (w)**：
   - 允许用户在目录中创建、删除和重命名文件和子目录。
   - 使用 `touch`、`rm`、`mv`、`cp` 等命令。
3. **执行权限 (x)**：
   - 允许用户进入目录。
   - 使用 `cd` 命令进入目录。

### 常见情形下的权限设置

1. **普通文件**：

   - 对于文本文件，通常设置为 `rw-r--r--`（644），即用户可读写，组和其他用户只读。
   - 对于可执行脚本或程序，通常设置为 `rwxr-xr-x`（755），即用户可读写执行，组和其他用户可读执行。

2. **目录**：

   - 对于普通目录，通常设置为 `rwxr-xr-x`（755），即用户可读写执行，组和其他用户可读执行。
   - 对于需要保护的目录，可以设置为 `rwx------`（700），即只有用户可读写执行。

3. **系统文件和目录**：
   - 系统文件和目录的权限通常由系统管理员根据安全策略设置。
   - 例如，`/etc` 目录通常设置为 `rwxr-xr-x`（755），而 `/root` 目录通常设置为 `rwx------`（700）。
