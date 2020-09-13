package main

import (
	"image/jpeg"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/nfnt/resize"
)

func main() {
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	dirPhotos := strings.Replace(dir, "thumbler", "public/wedding", -1)
	dirThumbler := strings.Replace(dir, "thumbler", "public/thumbs/", -1)

	files, err := filePathWalkDir(dirPhotos)
	if err != nil {
		log.Fatal(err)
	}
	for _, file := range files {
		imageFile, err := os.Open(file)
		defer imageFile.Close()
		if err != nil {
			log.Fatal(err)
		}
		myImage, err := jpeg.Decode(imageFile)
		if err != nil {
			log.Fatal(err)
		}

		nySubImage := resize.Resize(160, 0, myImage, resize.Lanczos3)

		f := strings.Split(file, "/")
		size := len(f)

		outputFile, err := os.Create(dirThumbler + f[size-1])
		defer outputFile.Close()

		if err != nil {
			log.Fatal(err)
		}
		jpeg.Encode(outputFile, nySubImage, nil)
	}
}

func filePathWalkDir(root string) ([]string, error) {
	var files []string
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if !info.IsDir() {
			files = append(files, path)
		}
		return nil
	})
	return files, err
}
