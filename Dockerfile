FROM alexellis2/streaming:07-05-2018

COPY entry.sh entry.sh

COPY lofi1.m4a lofi1.m4a
COPY lofi2.m4a lofi2.m4a
COPY lofi3.m4a lofi3.m4a
COPY lofi4.m4a lofi4.m4a
COPY lofi5.m4a lofi5.m4a
COPY playlist.txt playlist.txt

RUN chmod +x entry.sh

ENTRYPOINT ["./entry.sh"]
