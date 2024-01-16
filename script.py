import json
from anki.exporting import AnkiPackageExporter
from anki.importing.apkg import AnkiPackageReader

# Your JSON data
json_data = {
    "question": "What is the capital of France?",
    "answer": "Paris"
}

# Convert JSON to string
json_string = json.dumps(json_data)

# Save JSON string to a file (e.g., data.json)
with open('data.json', 'w') as file:
    file.write(json_string)

# Create an AnkiPackageExporter
exporter = AnkiPackageExporter()

# Add your JSON file to the package
exporter.add_file('data.json', 'media/data.json')

# Set other export options if needed
exporter.exportInto("output.apkg")

# Clean up the temporary files
exporter.cleanup()

# Now, you have an 'output.apkg' file with your JSON data
