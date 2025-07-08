import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { SiteContent } from '@shared/schema';

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: content, isLoading } = useQuery<SiteContent>({
    queryKey: ['/api/content'],
  });

  const updateContentMutation = useMutation({
    mutationFn: (updatedContent: Partial<SiteContent>) =>
      apiRequest('/api/content', 'PUT', updatedContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({
        title: "Conteúdo atualizado!",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    },
  });

  const [formData, setFormData] = useState<Partial<SiteContent>>({});

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  const handleSave = () => {
    updateContentMutation.mutate(formData);
  };

  const addImage = () => {
    const newImage = {
      src: '',
      alt: '',
      caption: ''
    };
    setFormData({
      ...formData,
      images: [...(formData.images || []), newImage]
    });
  };

  const updateImage = (index: number, field: string, value: string) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages[index] = { ...updatedImages[index], [field]: value };
    setFormData({ ...formData, images: updatedImages });
  };

  const removeImage = (index: number) => {
    const updatedImages = [...(formData.images || [])];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const addQuote = () => {
    setFormData({
      ...formData,
      quotes: [...(formData.quotes || []), '']
    });
  };

  const updateQuote = (index: number, value: string) => {
    const updatedQuotes = [...(formData.quotes || [])];
    updatedQuotes[index] = value;
    setFormData({ ...formData, quotes: updatedQuotes });
  };

  const removeQuote = (index: number) => {
    const updatedQuotes = [...(formData.quotes || [])];
    updatedQuotes.splice(index, 1);
    setFormData({ ...formData, quotes: updatedQuotes });
  };

  const addMemory = () => {
    const newMemory = {
      icon: 'fas fa-heart',
      iconColor: 'bg-red-500',
      title: '',
      description: '',
      date: ''
    };
    setFormData({
      ...formData,
      memories: [...(formData.memories || []), newMemory]
    });
  };

  const updateMemory = (index: number, field: string, value: string) => {
    const updatedMemories = [...(formData.memories || [])];
    updatedMemories[index] = { ...updatedMemories[index], [field]: value };
    setFormData({ ...formData, memories: updatedMemories });
  };

  const removeMemory = (index: number) => {
    const updatedMemories = [...(formData.memories || [])];
    updatedMemories.splice(index, 1);
    setFormData({ ...formData, memories: updatedMemories });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando painel de administração...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Painel de Administração
            </h1>
            <p className="text-gray-600">
              Edite o conteúdo do seu site de amor
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/">
              <Button variant="outline">
                <i className="fas fa-eye mr-2"></i>
                Ver Site
              </Button>
            </Link>
            <Button 
              onClick={handleSave}
              disabled={updateContentMutation.isPending}
              className="bg-pink-500 hover:bg-pink-600"
            >
              {updateContentMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <i className="fas fa-save mr-2"></i>
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="geral" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="imagens">Imagens</TabsTrigger>
            <TabsTrigger value="frases">Frases</TabsTrigger>
            <TabsTrigger value="memorias">Memórias</TabsTrigger>
            <TabsTrigger value="musica">Música</TabsTrigger>
          </TabsList>

          <TabsContent value="geral">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
                <CardDescription>
                  Configure as informações básicas do seu site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Site</Label>
                    <Input
                      id="title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Guilherme & Carolina"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtítulo</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Ex: Você é meu lugar favorito no mundo 💕"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início do Relacionamento</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={formData.startDate ? formData.startDate.slice(0, 16) : ''}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value + ':00Z' })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">Número do WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsappNumber || ''}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="Ex: 47999471966"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="imagens">
            <Card>
              <CardHeader>
                <CardTitle>Galeria de Fotos</CardTitle>
                <CardDescription>
                  Adicione e edite as fotos que aparecerão no carrossel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.images?.map((image, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">Foto {index + 1}</Badge>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label>URL da Imagem</Label>
                          <Input
                            value={image.src}
                            onChange={(e) => updateImage(index, 'src', e.target.value)}
                            placeholder="https://exemplo.com/foto.jpg"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Descrição</Label>
                          <Input
                            value={image.alt}
                            onChange={(e) => updateImage(index, 'alt', e.target.value)}
                            placeholder="Descrição da foto"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Legenda</Label>
                          <Input
                            value={image.caption}
                            onChange={(e) => updateImage(index, 'caption', e.target.value)}
                            placeholder="Legenda romântica"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={addImage}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Adicionar Foto
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="frases">
            <Card>
              <CardHeader>
                <CardTitle>Frases de Amor</CardTitle>
                <CardDescription>
                  Adicione frases românticas que aparecerão rotacionalmente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.quotes?.map((quote, index) => (
                    <div key={index} className="flex space-x-2">
                      <Textarea
                        value={quote}
                        onChange={(e) => updateQuote(index, e.target.value)}
                        placeholder="Digite uma frase romântica..."
                        className="flex-1"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeQuote(index)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={addQuote}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Adicionar Frase
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="memorias">
            <Card>
              <CardHeader>
                <CardTitle>Timeline de Memórias</CardTitle>
                <CardDescription>
                  Configure os momentos especiais do relacionamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formData.memories?.map((memory, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">Memória {index + 1}</Badge>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeMemory(index)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label>Título</Label>
                          <Input
                            value={memory.title}
                            onChange={(e) => updateMemory(index, 'title', e.target.value)}
                            placeholder="Ex: Primeiro Encontro"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Data</Label>
                          <Input
                            value={memory.date}
                            onChange={(e) => updateMemory(index, 'date', e.target.value)}
                            placeholder="Ex: 2019-07-08"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label>Ícone (Font Awesome)</Label>
                          <Input
                            value={memory.icon}
                            onChange={(e) => updateMemory(index, 'icon', e.target.value)}
                            placeholder="Ex: fas fa-heart"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label>Cor do Ícone</Label>
                          <Input
                            value={memory.iconColor}
                            onChange={(e) => updateMemory(index, 'iconColor', e.target.value)}
                            placeholder="Ex: bg-red-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>Descrição</Label>
                        <Textarea
                          value={memory.description}
                          onChange={(e) => updateMemory(index, 'description', e.target.value)}
                          placeholder="Descreva este momento especial..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={addMemory}
                  variant="outline"
                  className="w-full mt-4"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Adicionar Memória
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="musica">
            <Card>
              <CardHeader>
                <CardTitle>Música do Casal</CardTitle>
                <CardDescription>
                  Configure a música especial que representa vocês
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="musicTitle">Nome da Música</Label>
                    <Input
                      id="musicTitle"
                      value={formData.musicTitle || ''}
                      onChange={(e) => setFormData({ ...formData, musicTitle: e.target.value })}
                      placeholder="Ex: Perfect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="musicArtist">Artista</Label>
                    <Input
                      id="musicArtist"
                      value={formData.musicArtist || ''}
                      onChange={(e) => setFormData({ ...formData, musicArtist: e.target.value })}
                      placeholder="Ex: Ed Sheeran"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="musicFile">Arquivo de Música (URL)</Label>
                  <Input
                    id="musicFile"
                    value={formData.musicFile || ''}
                    onChange={(e) => setFormData({ ...formData, musicFile: e.target.value })}
                    placeholder="https://exemplo.com/musica.mp3"
                  />
                  <p className="text-sm text-gray-500">
                    Cole aqui o link direto do arquivo de música (.mp3, .wav, etc.)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}