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

ps 8144;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 8144 > /dev/null;
done;

for child in $(list_child_processes 8148);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/otsokinanen/Desktop/Työnhaku/Solita/Solita-CityBikes/Solita-CityBikes/bin/Debug/net7.0/f95c09a7f2ad48249e790624b155ec2d.sh;
