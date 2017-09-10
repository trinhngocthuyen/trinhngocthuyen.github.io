out_file="all.scss"

echo "" > ${out_file}

for file in *.scss; do
	name=${file/_/}
	if [[ $name == *"variables"* ]]; then
		echo "@import \"${name}\";" | cat - ${out_file} | tee ${out_file}
	elif [[ $name != "all.scss" ]]; then
		echo "@import \"${name}\";" >> ${out_file}
	fi
done