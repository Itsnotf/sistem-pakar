"use client";
import { gejala } from "@/data/gejala";
import { diagnosa } from "@/data/diagnosa";
import { relasi } from "@/data/relasi";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2, Stethoscope, X } from "lucide-react";
import { redirect } from "next/navigation";

export default function KonsultasiPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [identitas, setIdentitas] = useState({ nama: "", rekamMedis: "" });
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [hasilDiagnosa, setHasilDiagnosa] = useState<
    { id: string; name: string; confidence: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleIdentitasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentitas({ ...identitas, [e.target.name]: e.target.value });
  };

  const handleIdentitasSubmit = () => {
    if (identitas.nama.trim() && identitas.rekamMedis.trim()) {
      setStep(2);
    } else {
      toast.warning("Data belum lengkap", {
        description: "Harap isi nama dan nomor rekam medis dengan benar",
      });
    }
  };

  const handleChange = (id: string) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const forwardChaining = (selectedGejala: string[]) => {
    const hasil = [];
    for (const diagnosaId in relasi) {
      const penyakitGejala = relasi[diagnosaId];
      const matchingGejala = penyakitGejala.filter((g) =>
        selectedGejala.includes(g)
      ).length;
      const confidence = (matchingGejala / penyakitGejala.length) * 100;

      if (confidence > 40) {
        const disease = diagnosa.find((d) => d.id === diagnosaId);
        if (disease) {
          hasil.push({
            id: disease.id,
            name: disease.name,
            confidence: Math.round(confidence),
          });
        }
      }
    }
    return hasil.sort((a, b) => b.confidence - a.confidence);
  };

  const handleSubmit = () => {
    const selectedGejala = Object.keys(answers).filter((id) => answers[id]);
    if (selectedGejala.length === 0) {
      toast.info("Belum ada gejala dipilih", {
        description: "Pilih setidaknya satu gejala yang Anda alami",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = forwardChaining(selectedGejala);
      setHasilDiagnosa(result);
      setIsLoading(false);

      if (result.length === 0) {
        toast.success("Hasil Pemeriksaan", {
          description:
            "Berdasarkan gejala yang dipilih, Anda tidak terindikasi penyakit serius",
        });
      } else {
        const diagnosaData = {
          nama: identitas.nama,
          rekamMedis: identitas.rekamMedis,
          diagnosa: result[0].name,
          confidence: result[0].confidence,
        };

        fetch("/api/sendDiagnosa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(diagnosaData),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));

        setIsOpen(true);
      }
    }, 1500);
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          Konsultasi Kesehatan Reproduksi
        </h1>
        <p className="text-muted-foreground">
          Deteksi dini gejala masalah reproduksi wanita dengan sistem pakar kami
        </p>
      </div>

      {step === 1 ? (
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Identitas Pasien</CardTitle>
            <CardDescription className="text-center">
              Mohon lengkapi data berikut sebelum konsultasi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input
                id="nama"
                name="nama"
                placeholder="Contoh: Siti Nurhaliza"
                value={identitas.nama}
                onChange={handleIdentitasChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rekamMedis">Nomor Rekam Medis</Label>
              <Input
                id="rekamMedis"
                name="rekamMedis"
                placeholder="Masukkan nomor RM Anda"
                value={identitas.rekamMedis}
                onChange={handleIdentitasChange}
              />
            </div>

            <Button
              onClick={handleIdentitasSubmit}
              className="w-full mt-4"
              size="lg"
            >
              Lanjut ke Pemilihan Gejala
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center">
                Pilih Gejala yang Dialami
              </CardTitle>
              <CardDescription className="text-center">
                Centang semua gejala yang sesuai dengan kondisi Anda saat ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {gejala.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-2 hover:bg-accent rounded-lg"
                  >
                    <Checkbox
                      id={`gejala-${item.id}`}
                      checked={answers[item.id] || false}
                      onCheckedChange={() => handleChange(item.id)}
                    />
                    <label
                      htmlFor={`gejala-${item.id}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="w-full sm:w-auto"
            >
              Kembali
            </Button>
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menganalisis...
                </>
              ) : (
                <>
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Dapatkan Hasil Diagnosa
                </>
              )}
            </Button>
          </div>

          {isOpen && (
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogContent className="max-w-md ">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>

                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    Hasil Analisis Gejala
                  </AlertDialogTitle>
                  <div className="space-y-3">
                    {hasilDiagnosa.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 border rounded-lg bg-background"
                      >
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Tingkat Kecocokan: {item.confidence}%
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground mt-4">
                      *Hasil ini bersifat edukatif dan bukan pengganti diagnosis
                      medis. Untuk pemeriksaan lebih lanjut, silakan
                      konsultasikan dengan dokter spesialis.
                    </p>
                  </div>
                </AlertDialogHeader>

                <div className="flex justify-center gap-3 mt-4">
                  <AlertDialogCancel asChild>
                    <Button variant="outline">Tutup</Button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      onClick={() => {
                        toast.success("Hasil Konsultasi Berhasil Disimpan", {
                          description:
                            "Terima kasih telah menggunakan layanan kami. Hasil diagnosa telah tersimpan dalam rekam medis Anda.",
                          action: {
                            label: "Mengerti",
                            onClick: () => {
                              redirect("/edukasi");
                            },
                          },
                        });
                        setIsOpen(false);
                      }}
                    >
                      Simpan Hasil
                    </Button>
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </>
      )}
    </div>
  );
}
