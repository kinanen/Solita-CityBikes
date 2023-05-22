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

ps 5984;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 5984 > /dev/null;
done;

for child in $(list_child_processes 5989);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/otsokinanen/Desktop/Työnhaku/Solita/Solita-CityBikes/Solita-CityBikes/bin/Debug/net7.0/1d42d40ba63246e19019d8555e6a4f1f.sh;
