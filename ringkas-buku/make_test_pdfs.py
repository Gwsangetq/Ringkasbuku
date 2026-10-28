# Simple pure-Python PDF generator (no external libraries needed)
def create_pdf(filename, title, author, text_lines):
    # Minimal valid PDF 1.4
    objects = []
    
    def add_obj(content):
        objects.append(content)
        return len(objects)

    # 1: Catalog
    add_obj("<< /Type /Catalog /Pages 2 0 R >>")
    # 2: Pages (placeholder, updated later)
    add_obj("") 
    # 3: Font
    add_obj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    page_objs = []
    
    # Chunk lines into pages of ~40 lines
    page_size = 40
    chunks = [text_lines[i:i + page_size] for i in range(0, len(text_lines), page_size)]
    if not chunks:
        chunks = [["[Dokumen Buku]"]]
        
    for chunk in chunks:
        # Build stream content
        stream_lines = ["BT", "/F1 12 Tf", "50 750 Td", "14 TL"]
        # Escape parenthesis
        for line in chunk:
            safe_line = line.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
            # encode ascii
            safe_line = "".join(c if ord(c) < 128 else " " for c in safe_line)
            stream_lines.append(f"({safe_line}) '")
        stream_lines.append("ET")
        stream_content = "\n".join(stream_lines)
        
        # Stream obj
        content_idx = add_obj(f"<< /Length {len(stream_content)} >>\nstream\n{stream_content}\nendstream")
        
        # Page obj
        page_idx = add_obj(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents {content_idx} 0 R >>")
        page_objs.append(page_idx)

    # Now update Pages object (obj 2)
    kids_str = " ".join(f"{p} 0 R" for p in page_objs)
    objects[1] = f"<< /Type /Pages /Kids [{kids_str}] /Count {len(page_objs)} >>"

    # Assemble PDF with xref
    out = ["%PDF-1.4\n"]
    xref = [0]
    pos = len(out[0])

    for i, obj in enumerate(objects, 1):
        xref.append(pos)
        obj_str = f"{i} 0 obj\n{obj}\nendobj\n"
        out.append(obj_str)
        pos += len(obj_str)

    xref_pos = pos
    out.append(f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n")
    for offset in xref[1:]:
        out.append(f"{offset:010d} 00000 n \n")

    out.append(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n")

    with open(filename, "wb") as f:
        f.write("".join(out).encode("latin1"))
    print(f"Generated valid PDF: {filename} with {len(page_objs)} pages.")

# Generate sample book
sample_text = [
    "GRIT: THE POWER OF PASSION AND PERSEVERANCE",
    "By Angela Duckworth",
    "",
    "CHAPTER 1: SHOWING UP",
    "Why talent is not enough. In my first year of graduate school,",
    "I was obsessed with why some people succeed while others of equal talent fail.",
    "Our society has an unhealthy obsession with talent and prodigies.",
    "We love the myth of the natural genius because it lets us off the hook:",
    "if talent is a gift from the gods, we do not have to hold ourselves accountable.",
    "",
    "CHAPTER 2: DISTRACTED BY TALENT",
    "The danger of overemphasizing innate ability.",
    "When we celebrate talent over effort, we cultivate a fixed mindset in our children.",
    "Effort counts twice. Effort builds skill, and effort makes skill productive.",
    "Talent x Effort = Skill.",
    "Skill x Effort = Achievement.",
    "",
    "CHAPTER 3: EFFORT COUNTS TWICE",
    "Without effort, your talent is nothing more than your unmet potential.",
    "Without effort, your skill is nothing more than what you could have done but didn't.",
    "With effort, talent becomes skill, and at the very same time, effort makes skill productive.",
    "",
    "CHAPTER 4: HOW GRITTY ARE YOU?",
    "The Grit Scale measures two components: Passion and Perseverance.",
    "Passion is not about intense infatuation; it is about consistency over time.",
    "Perseverance is the willingness to stick with a goal even when you encounter setbacks.",
    "",
    "CHAPTER 5: GRIT GROWS",
    "Can grit be developed? Yes. Grit grows through four assets:",
    "1. Interest: Curiosity and enjoyment in what you do.",
    "2. Practice: The daily discipline of deliberate practice to improve.",
    "3. Purpose: The conviction that your work matters to other people.",
    "4. Hope: The resilience to keep going when things are hard.",
    "",
    "CHAPTER 6: DELIBERATE PRACTICE",
    "How experts practice differently from amateurs.",
    "They focus on their weaknesses, seek immediate feedback, and repeat with intense focus.",
    "Grit requires pairing relentless repetition with continuous refinement."
]

create_pdf(r"C:\Users\kumala\Downloads\Grit_Angela_Duckworth.pdf", "Grit", "Angela Duckworth", sample_text)
create_pdf(r"C:\Users\kumala\Downloads\Start_with_Why_Simon_Sinek.pdf", "Start with Why", "Simon Sinek", [
    "START WITH WHY: HOW GREAT LEADERS INSPIRE EVERYONE TO TAKE ACTION",
    "By Simon Sinek",
    "",
    "CHAPTER 1: ASSUME YOU KNOW",
    "Why starting with assumptions leads to flawed decisions.",
    "Most organizations make decisions based on what they think they know.",
    "Great leaders start by questioning the fundamental premise.",
    "",
    "CHAPTER 2: CARROTS AND STICKS",
    "Manipulations versus Inspiration. Price, promotions, fear, and peer pressure.",
    "Manipulations work, but they breed zero loyalty and are expensive to sustain.",
    "Inspiration creates sustainable competitive advantages.",
    "",
    "CHAPTER 3: THE GOLDEN CIRCLE",
    "Every single organization knows WHAT they do.",
    "Some know HOW they do it (their unique value proposition).",
    "Very few know WHY they do what they do.",
    "WHY is not about making money; money is a result.",
    "WHY is a purpose, cause, or belief.",
    "People don't buy what you do; they buy why you do it.",
    "",
    "CHAPTER 4: THIS IS NOT OPINION, THIS IS BIOLOGY",
    "The Golden Circle corresponds directly to the three major levels of the brain.",
    "The Neocortex corresponds to the WHAT level (rational thought and language).",
    "The Limbic Brain corresponds to the HOW and WHY levels (feelings, trust, decision-making).",
    "When we communicate from the inside out, we talk directly to the decision-making brain.",
    "",
    "CHAPTER 5: CLARITY, DISCIPLINE, AND CONSISTENCY",
    "Clarity of WHY: You have to know why you do what you do.",
    "Discipline of HOW: Holding yourself and your team accountable to guiding principles.",
    "Consistency of WHAT: Everything you say and do must prove what you believe."
])
