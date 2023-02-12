import json
import os

def process_data(input_file, output_file):
    d = {}
    with open(input_file, 'r', encoding='utf8') as file:
        data = file.read()
        original_data = json.loads(data)
        # iterate over all elements and put into dictionary based on whether thye're posts or comments
        for i in range(1, len(original_data)):
            if "dataType" in original_data[i].keys():
                key = original_data[i]["url"].split('/')[7]
<<<<<<< Updated upstream
                curr_prompt = original_data[i]["title"] + " " + original_data[i]["body"]
=======
>>>>>>> Stashed changes
                d[key] = [curr_prompt, []]
            else:
                key = original_data[i]["url"].split('/')[5]
                d[key][1].append(original_data[i])
    output = []
    for key in d.keys():
        # iterate over the comments and perform the skip top level algo
        i = 0
        while i < len(d[key][1]):
            comment = d[key][1][i]
<<<<<<< Updated upstream
            
=======
            curr_prompt = original_data[i]["title"] + " " + original_data[i]["body"]
>>>>>>> Stashed changes
            i +=1
            number_to_skip = comment["numberOfreplies"]
            
            if comment["username"] == "AutoModerator":
                i += 1
<<<<<<< Updated upstream
                continue
            
            curr_response = comment["body"]
            prompt_and_completion = {"prompt": d[key][0], "completion": curr_response}
=======
            
            curr_response = comment[i]["body"]
            prompt_and_completion = {prompt: curr_prompt, completion: curr_response}
>>>>>>> Stashed changes
            output.append(prompt_and_completion)
            i += 1
            while (number_to_skip > 0 and i < len(d[key][1])):
                number_to_skip -= 1
                number_to_skip += d[key][1][i]["numberOfreplies"]
                i += 1
    with open(output_file, 'w', encoding='utf8') as file:
        file.write(json.dumps(output))
        print(f"Data written to {output_file}")
<<<<<<< Updated upstream
                
process_data("dataset_reddit-scraper_2023-02-11_22-21-58-136.json", "output_python.json")
=======
        

                
>>>>>>> Stashed changes
            