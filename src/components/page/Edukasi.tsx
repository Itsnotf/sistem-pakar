"use client";
import { BookOpenText, ShieldCheck, HeartPulse, Leaf, MoonStar, Droplets, Ban } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tips = [
  {
    title: "Jaga Kebersihan Area Kewanitaan",
    icon: <Droplets className="w-8 h-8 text-blue-500" />,
    points: [
      "Gunakan air bersih saat membasuh",
      "Hindari sabun berpewangi atau antiseptik yang terlalu keras",
      "Bersihkan dari depan ke belakang setelah buang air"
    ],
    color: "bg-blue-50"
  },
  {
    title: "Vaksinasi HPV",
    icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
    points: [
      "Efektif mencegah infeksi virus penyebab kanker serviks",
      "Ideal diberikan sejak usia 9 tahun",
      "Bisa diberikan hingga usia 45 tahun"
    ],
    color: "bg-green-50"
  },
  {
    title: "Hindari Seks Bebas",
    icon: <Ban className="w-8 h-8 text-red-500" />,
    points: [
      "Jaga keseimbangan hormonal",
      "Kurangi risiko infeksi kronis",
      "Cegah pertumbuhan sel abnormal"
    ],
    color: "bg-red-50"
  },
  {
    title: "Pakaian Dalam Nyaman",
    icon: <HeartPulse className="w-8 h-8 text-purple-500" />,
    points: [
      "Pilih bahan katun yang menyerap keringat",
      "Ganti minimal 2 kali sehari",
      "Hindari bahan sintetis yang lembap"
    ],
    color: "bg-purple-50"
  },
  {
    title: "Makanan Sehat & Seimbang",
    icon: <Leaf className="w-8 h-8 text-amber-500" />,
    points: [
      "Perbanyak sayur, buah dan air putih",
      "Hindari makanan tinggi gula",
      "Kurangi lemak jenuh pemicu peradangan"
    ],
    color: "bg-amber-50"
  },
  {
    title: "Hindari Stres & Cukup Istirahat",
    icon: <MoonStar className="w-8 h-8 text-indigo-500" />,
    points: [
      "Stres mengganggu hormon reproduksi",
      "Tidur 7-9 jam per malam",
      "Jaga keseimbangan siklus menstruasi"
    ],
    color: "bg-indigo-50"
  }
];

export default function EdukasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          <BookOpenText className="inline mr-3 w-8 h-8" />
          Edukasi Kesehatan Reproduksi Wanita
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Informasi penting untuk menjaga kesehatan reproduksi Anda dengan baik
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {tips.map((tip, index) => (
          <Card key={index} className={`${tip.color} hover:shadow-lg transition-shadow`}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-white mr-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold">{tip.title}</h3>
              </div>
              <ul className="space-y-2 pl-4">
                {tip.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mt-2 mr-2"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hindari Merokok & Alkohol</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-red-600">Bahaya Merokok</h3>
              <ul className="space-y-2 text-left">
                <li>• Meningkatkan risiko kanker serviks</li>
                <li>• Mengganggu kesuburan</li>
                <li>• Mempercepat penuaan sel reproduksi</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3 text-amber-600">Efek Alkohol</h3>
              <ul className="space-y-2 text-left">
                <li>• Mengganggu keseimbangan hormon</li>
                <li>• Mempengaruhi siklus menstruasi</li>
                <li>• Meningkatkan risiko infeksi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}