"use client";

import {
  Stethoscope,
  BookOpen,
  AlertTriangle,
  Shield,
  ClipboardCheck,
  HeartPulse,
} from "lucide-react";
import { Button } from "../ui/button";

export default function Beranda() {
  return (
    <div className="space-y-20 pb-20">
      <section className="container md:px-28 p-5 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-primary text-center md:text-left  leading-tight">
              Deteksi Dini{" "}
              <span className="text-blue-600">Kesehatan Reproduksi</span> Anda
            </h1>

            <p className="text-lg text-muted-foreground md:text-start text-center">
              Sistem pakar kami membantu wanita mengenali gejala awal masalah
              reproduksi. Dapatkan analisis cepat dan rekomendasi edukatif dalam
              beberapa menit.
            </p>

            <div className="flex justify-center md:justify-start gap-4 mt-8">
              <Button
                className="px-8 py-6 mdtext-lg rounded-full gap-2 text-sm"
                size="lg"
              >
                <Stethoscope className="w-5 h-5" />
                Mulai Deteksi
              </Button>
              <Button
                className="px-8 py-6 md:text-lg rounded-full gap-2 text-sm"
                variant="outline"
                size="lg"
              >
                <BookOpen className="w-5 h-5" />
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <img
              src="/hero-image.png"
              alt="Woman with health illustration"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="container md:px-28 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Jenis Gangguan yang Bisa Dideteksi
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Kenali gejala dini berbagai masalah kesehatan reproduksi wanita
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Kanker Serviks",
                desc: "Deteksi dini meningkatkan peluang kesembuhan hingga 90%",
                icon: <Shield className="w-8 h-8 text-blue-600" />,
              },
              {
                name: "Kanker Rahim",
                desc: "Perubahan menstruasi bisa menjadi tanda awal",
                icon: <ClipboardCheck className="w-8 h-8 text-pink-600" />,
              },
              {
                name: "Kista Ovarium",
                desc: "Nyeri panggul yang tidak biasa perlu diperhatikan",
                icon: <HeartPulse className="w-8 h-8 text-purple-600" />,
              },
              {
                name: "Kista Rahim",
                desc: "Sering tanpa gejala tapi bisa mengganggu kesuburan",
                icon: <AlertTriangle className="w-8 h-8 text-amber-600" />,
              },
            ].map((diagnosis, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-100 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-blue-50">
                    {diagnosis.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {diagnosis.name}
                </h3>
                <p className="text-muted-foreground">{diagnosis.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container md:px-28 mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Mengapa Menggunakan Sistem Kami?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Solusi komprehensif untuk kesehatan reproduksi wanita
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Deteksi Cepat",
              desc: "Hanya perlu 5 menit untuk mendapatkan analisis awal",
              icon: <Stethoscope className="w-10 h-10 text-blue-600" />,
            },
            {
              title: "Edukasi Kesehatan",
              desc: "Materi edukasi berbasis penelitian medis terbaru",
              icon: <BookOpen className="w-10 h-10 text-green-600" />,
            },
            {
              title: "Privasi Terjaga",
              desc: "Data Anda aman dan tidak dibagikan ke pihak lain",
              icon: <Shield className="w-10 h-10 text-purple-600" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-50">{feature.icon}</div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container md:px-28 mx-auto px-4 max-w-full">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg text-yellow-800 mb-2">
                Penting!
              </h3>
              <p className="text-yellow-800">
                Sistem ini memberikan informasi awal dan edukasi kesehatan.
                Hasil bukan diagnosis medis. Konsultasikan dengan dokter untuk
                pemeriksaan lebih lanjut. Dalam keadaan darurat, segera hubungi
                layanan kesehatan terdekat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
