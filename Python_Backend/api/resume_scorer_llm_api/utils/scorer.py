from api.resume_scorer_llm_api.utils.openai_client import chat_completion
from api.resume_scorer_llm_api.utils.logger import save_scoring_output  # ✅ NEW
import re

def load_prompt_from_file(filepath="api/resume_scorer_llm_api/prompts/system_prompt.txt"):
    with open(filepath, "r") as f:
        return f.read()

def clean_response(raw: str) -> str:
    # Strip triple backticks and any language identifier like ```json or ```rust
    return re.sub(r"^```[\w]*\n?|```$", "", raw.strip(), flags=re.MULTILINE).strip()


def score_resume_against_jd(parsed_resume: str, job_description: str, candidate_name="unknown") -> str:
    system_prompt = load_prompt_from_file()

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Resume: {parsed_resume}\n\nJob Description: {job_description}"}
    ]

    result = chat_completion(messages)

    return result
