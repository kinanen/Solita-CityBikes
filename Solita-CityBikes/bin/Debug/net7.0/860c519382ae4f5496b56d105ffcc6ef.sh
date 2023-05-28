function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 39638;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 39638 > /dev/null;
done;

for child in $(list_child_processes 40021);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/otsokinanen/Desktop/Työnhaku/Solita/Solita-CityBikes/Solita-CityBikes/bin/Debug/net7.0/860c519382ae4f5496b56d105ffcc6ef.sh;
