from fpdf import FPDF
from pdf2image import convert_from_path
import glob,os
import re
import textractor
import urllib.request


def download_file(download_url, filename):
    
    response = urllib.request.urlopen(download_url)

    file = open(filename + ".pdf", 'wb')
    file.write(response.read())
    file.close()


def pdf_to_image(pdf_path):    
    
    pages = convert_from_path(pdf_path, 200, fmt='JPEG')
    directory = pdf_path[:-4]
    
    if not os.path.isdir(directory):
        os.mkdir(directory)
    
    [page.save(os.path.join(directory, str(o)+".jpg")) for o, page in enumerate(pages, 1)]


def txt_to_pdf(dir_path):
    
    pdf = FPDF()
    pdf.set_font("Arial", size = 15)
    
    directory = dir_path
    
    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        print(os.path.join(directory,filename))


        if filename.endswith(".txt") or filename.endswith(".TXT"): 
            
            f = open(os.path.join(directory,filename), "r")
            Lines = f.readlines()
            pdf.add_page()
            count = 1
            for  x in Lines:
                pdf.cell(200, 10, txt = x, ln = count, align = 'C')
                count += 1
                
        else:
            continue
    path = os.path.join(directory,"Output.pdf")
    pdf.output(path)
    return path


def convert(pdf_url,filename):
    
    pdf_path = filename + ".pdf"

    download_file(pdf_url,filename)

    directory = pdf_path[:-4] + '/'
    
    pdf_to_image(pdf_path)
    
    args = ["--documents", directory, "--text"]
    textractor.Textractor().run(args)

    output_pdf = txt_to_pdf(directory)

    print(os.path.join(directory, "Output.pdf"))

    return output_pdf

#convert('https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf', 'Sample')
