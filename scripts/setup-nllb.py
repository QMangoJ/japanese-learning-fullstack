from pathlib import Path
from huggingface_hub import snapshot_download

target = Path(__file__).resolve().parents[1] / "tmp/nllb-ja-zh"
snapshot_download(
    repo_id="neverLife/nllb-200-distilled-600M-ja-zh",
    local_dir=target,
    allow_patterns=["*.json", "*.model", "*.txt", "*.safetensors", "pytorch_model.bin"],
)
print(target)
