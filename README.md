# Companion app for Stardew Valley

Data sourced from the game's data files.

To convert the game data files to JSON, using [xnbcli](https://github.com/LeonBlade/xnbcli)

```bash
mkdir stardew_data
find $STARDEW_PATH -name '*.xnb' -path '*Data*' |
	grep -vP '[a-z]{2}-[A-Z]{2}' | # get rid of translations
	while read -r file; do
		xnbcli unpack $file stardew_data;
	done
```


