"""
Adds the english names to card scripts, retrieving them from a database provided as input
input: a card dabatase, selected via Tkinter's interface
     : a path where the scripts will be read from

"""
import sqlite3
import os
import sys
import tkinter as tk
from tkinter import filedialog, messagebox

def get_database_card_names(database_path):
    card_names = {}
    try:
        with sqlite3.connect(database_path) as conn:
            current_conn = conn.cursor()
            current_conn.execute("SELECT id, name FROM texts")
            for card_id, card_name in current_conn.fetchall():
                card_names[card_id] = card_name
    except sqlite3.Error as e:
        messagebox.showerror("Database Error", f"Error accessing the database: {e}")
    return card_names

def update_script_comments(lines, card_id, card_name):
    changed = False
    if not lines or not lines[0].startswith("--"):
        return lines, changed
    if len(lines) > 1 and lines[1].startswith("--"):
        current_name = lines[1][2:].strip()
        if current_name != card_name:
            lines[1] = f"--{card_name}\n"
            changed = True
    else:
        lines.insert(1, f"--{card_name}\n")
        changed = True
    return lines, changed

def update_script_files(scripts_path, card_names, max_updates=1000):
    updated_count = 0
    for file_name in os.listdir(scripts_path):
        if updated_count >= max_updates:
            print("Maximum number of scripts reached.")
            break
        if file_name.startswith("c") and file_name.endswith(".lua"):
            card_id_str = file_name[1:-4]
            try:
                card_id = int(card_id_str)
                if card_id in card_names:
                    script_path = os.path.join(scripts_path, file_name)
                    with open(script_path, 'r', encoding='utf-8') as script_file:
                        lines = script_file.readlines()
                    lines, comments_changed = update_script_comments(lines, card_id, card_names[card_id])
                    if comments_changed:
                        with open(script_path, 'w', encoding='utf-8') as script_file:
                            script_file.writelines(lines)
                        updated_count += 1
                        print(f"Updated {file_name}. ({updated_count}/{max_updates})")
                #else:
                #    print(f"Card ID {card_id} not found in the database. Skipping file.")
            except ValueError:
                print(f"Invalid card ID in file name {file_name}. Skipping file.")
    print(f"\nTotal scripts updated: {updated_count}")
    messagebox.showinfo("Finished", f"Total scripts updated: {updated_count}")

def main():
    root = tk.Tk()
    root.withdraw()
    database_path = filedialog.askopenfilename(
        title="Select the database (.cdb) file",
        filetypes=[("SQLite Database Files", "*.cdb"), ("All Files", "*.*")])
    if not database_path:
        print("No database file selected. Exiting.")
        return
    scripts_path = filedialog.askdirectory(title="Select the folder with Lua script files")
    if not scripts_path:
        print("No script folder selected. Exiting.")
        return
    card_names = get_database_card_names(database_path)
    if not card_names:
        print("No card names retrieved from the database. Exiting.")
        return
    print("Updating script files (up to 1000 scripts)...")
    update_script_files(scripts_path, card_names)
    print("Finished updating scripts.")

if __name__ == "__main__":
    sys.exit(main())