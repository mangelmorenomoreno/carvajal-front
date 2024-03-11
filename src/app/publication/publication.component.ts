import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { PublicacionService } from '../publicacion.service';
import { ComentarioService } from '../comentario.service';
import { InfoUserService } from '../info-user.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'publication',
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent implements OnInit {
  publicacion = {
    postId: '',
    titulo: '',
    contenido: ''
  };
  data: any;
  listComentarios:any;
  userid: any;
  registrationSuccess: boolean = false;
  updateSuccess: boolean = false;
  errorUpdate: boolean = false;
  errorListar: boolean = false;
  succesListar: boolean = false;
  errorEliminar: boolean = false;
  succesEliminar: boolean = false;
  registerForm: FormGroup;
  modificarForm: FormGroup;
  registrarComentarioForm: FormGroup;
  registrarRespuestaForm: FormGroup;
  countdown: number = 10;
  modificarComentario: boolean = false;
  modificarId: number = 0;
  registarComentario: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formBuilderModificar: FormBuilder,
    private formBuilderComentarioi: FormBuilder,
    private formBuilderRespuestai: FormBuilder,
    private publicacionService: PublicacionService,
    private comentarioService: ComentarioService,
    private infoUserService: InfoUserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.registerForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      contenido: ['', [Validators.required]],
    });
    this.modificarForm = this.formBuilderModificar.group({
      postId: [''],
      titulo: ['', Validators.required],
      contenido: ['', [Validators.required]],
    });
    this.registrarRespuestaForm = this.formBuilderRespuestai.group({
      postId: [''],
      contenido: ['', Validators.required]
    });

    this.registrarComentarioForm = this.formBuilderComentarioi.group({
      postId: [''],
      contenido: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const userValue = localStorage.getItem('user');
      if (userValue) {
        const userv = JSON.parse(userValue);
        if (userv && userv.accessToken) {

          //Ejecuta consulta de publicaciones
          this.publicacionService.listPublicacion(userv.accessToken).subscribe(
            response => {
              if (response.data !== null) {
                this.errorListar = false;
                this.succesListar = true;
                this.data = response.data;
                this.infoUserService.findUser(userv.accessToken).subscribe(response => {
                  this.userid = response.data.userId;
                });

              } else {
                this.errorListar = true;
                this.succesListar = true;
              }
            },
            error => {
              this.errorUpdate = true;
              console.error('Error ejecutar', error);
            }
          );
          //Ejecuta consulta de comentarios
          this.comentarioService.listComentario(userv.accessToken).subscribe(
            response => {
              if (response.data !== null) {
               
                this.listComentarios = response.data;
                

              } else {
                this.errorListar = true;
                this.succesListar = true;
              }
            },
            error => {
              this.errorUpdate = true;
              console.error('Error ejecutar', error);
            }
          );


        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
  modificarPublicacion(postId: number): void {
    this.modificarId = postId;
    this.modificarComentario = true;
  }

  seleccionarPublicacionParaModificar(publicacion: any) {
    this.modificarId = publicacion.postId;
    this.modificarComentario = true;
    this.modificarForm.setValue({
      postId: publicacion.postId,
      titulo: publicacion.titulo || '',
      contenido: publicacion.contenido || ''
    });
  }

  cancelarrPublicacion(): void {
    this.modificarId = 0;
    this.modificarComentario = false;
  }

  registrarRespuesta(commentId:any) :void {
    this.registrarRespuestaForm.value
    const userValue = localStorage.getItem('user');
    if (userValue) {
      const userv = JSON.parse(userValue);
      if (userv && userv.accessToken) {


      }
    }
  }

 cargarRespuesta(commentId:any) :void {
    this.registrarRespuestaForm.setValue({
      postId: commentId,
      contenido: ''     
    });
  }

  eliminarComentario(commentId: number){
    const userValue = localStorage.getItem('user');
    if (userValue) {
      const userv = JSON.parse(userValue);
      if (userv && userv.accessToken) {
        this.comentarioService.deleteComentario(userv.accessToken, commentId).subscribe(
          response => {
            this.publicacionService.listPublicacion(userv.accessToken).subscribe(
              response => {

                if (response.data !== null) {
                  this.errorListar = false;
                  this.succesListar = true;
                  this.data = response.data;
                  this.countdown = 10;
                  this.registerForm.reset();
                } else {
                  this.errorListar = true;
                  this.succesListar = true;
                }
              },
              error => {
                this.errorUpdate = true;
                console.error('Error ejecutar', error);
              }
            );
            this.comentarioService.listComentario(userv.accessToken).subscribe(
              response => {
                if (response.data !== null) {
                 
                  this.listComentarios = response.data;
                  
  
                } else {
                  this.errorListar = true;
                  this.succesListar = true;
                }
              },
              error => {
                this.errorUpdate = true;
                console.error('Error ejecutar', error);
              }
            );

          });
  }
}
}

  eliminarPublicacion(postId: number): void {
    const userValue = localStorage.getItem('user');
    if (userValue) {
      const userv = JSON.parse(userValue);
      if (userv && userv.accessToken) {
        this.publicacionService.deletePublicacion(userv.accessToken, postId).subscribe(
          response => {
            if (response.data === true) {

              this.errorEliminar = false;
              this.succesEliminar = true;


              this.publicacionService.listPublicacion(userv.accessToken).subscribe(
                response => {
                  if (response.data !== null) {
                    this.errorListar = false;
                    this.succesListar = true;
                    this.data = response.data;
                    this.countdown = 10;
                    this.registerForm.reset();
                  } else {
                    this.errorListar = true;
                    this.succesListar = true;
                  }
                },
                error => {
                  this.errorUpdate = true;
                  console.error('Error ejecutar', error);
                }
              );
              this.comentarioService.listComentario(userv.accessToken).subscribe(
                response => {
                  if (response.data !== null) {
                   
                    this.listComentarios = response.data;
                    
    
                  } else {
                    this.errorListar = true;
                    this.succesListar = true;
                  }
                },
                error => {
                  this.errorUpdate = true;
                  console.error('Error ejecutar', error);
                }
              );
    
    


            } else {
              this.errorEliminar = true;
              this.succesEliminar = false;
            }
          },
          error => {
            this.errorUpdate = true;
            console.error('Error ejecutar', error);
          }
        );
      }
    }
  }

  incializarComentario(postId: any): void {
    this.registrarComentarioForm.setValue({
      postId: postId,
      contenido: null
    });
  }

  registrarComentario(postId: any): void {
    const userValue = localStorage.getItem('user');
    if (userValue) {
      const userv = JSON.parse(userValue);
      if (userv && userv.accessToken) {
       
        if (this.registrarComentarioForm.valid) {
          this.comentarioService.saveComentario(this.registrarComentarioForm.value, userv.accessToken).subscribe(
            response => {
              if (response.data === true) {
                
                this.comentarioService.listComentario(userv.accessToken).subscribe(
                  response => {
                    if (response.data !== null) {
                      
                      this.listComentarios = response.data;
                      this.registrarComentarioForm.reset();
                      
                    } 
                  },
                  error => {
                    this.errorUpdate = true;
                    console.error('Error ejecutar', error);
                  }
                );
               
              }
            },
            error => {
              this.errorUpdate = true;
              console.error('Error al actualizar el usuario', error);
            }
          );

        }
      }
    }      


  }
  updatePublicacion(): void {
    const userValue = localStorage.getItem('user');
    if (userValue) {
      const userv = JSON.parse(userValue);
      if (userv && userv.accessToken) {
        if (this.modificarForm.valid) {

          this.publicacionService.updatePublicacion(this.modificarForm.value, userv.accessToken).subscribe(
            response => {
              if (response.data === true) {
                this.errorUpdate = false;
                this.modificarId = 0;
                this.publicacionService.listPublicacion(userv.accessToken).subscribe(
                  response => {
                    if (response.data !== null) {
                      this.errorListar = false;
                      this.succesListar = true;
                      this.data = response.data;
                    }
                  },
                  error => {
                    this.errorUpdate = true;
                    console.error('Error ejecutar', error);
                  }
                );

                this.comentarioService.listComentario(userv.accessToken).subscribe(
                  response => {
                    if (response.data !== null) {
                      
                      this.listComentarios = response.data;
                      
                    } 
                  },
                  error => {
                    this.errorUpdate = true;
                    console.error('Error ejecutar', error);
                  }
                );


              } else {
                this.errorUpdate = true;
              }
            },
            error => {
              this.errorUpdate = true;
              console.error('Error al actualizar el usuario', error);
            }
          );

        }

      }
    }
  }

  insertPublicacion(): void {
    this.countdown = 10;
    const userValue = localStorage.getItem('user');
    if (userValue) {
      const userv = JSON.parse(userValue);
      if (userv && userv.accessToken) {
        if (this.registerForm.valid) {

          this.publicacionService.savePublicacion(this.registerForm.value, userv.accessToken).subscribe(
            response => {
              if (response.data === true) {
                this.registrationSuccess = true;
                this.errorUpdate = false;
                const interval = setInterval(() => {
                  this.countdown--;
                  if (this.countdown === 0) {
                    clearInterval(interval);
                    this.registrationSuccess = false;
                    //Ejecuta consulta de publicaciones
                    this.publicacionService.listPublicacion(userv.accessToken).subscribe(
                      response => {
                        if (response.data !== null) {
                          this.errorListar = false;
                          this.succesListar = true;
                          this.data = response.data;
                          this.countdown = 10;
                          this.registerForm.reset();
                        } else {
                          this.errorListar = true;
                          this.succesListar = true;
                        }
                      },
                      error => {
                        this.errorUpdate = true;
                        console.error('Error ejecutar', error);
                      }
                    );
                    this.comentarioService.listComentario(userv.accessToken).subscribe(
                      response => {
                        if (response.data !== null) {
                          
                          this.listComentarios = response.data;
                          
                        } 
                      },
                      error => {
                        this.errorUpdate = true;
                        console.error('Error ejecutar', error);
                      }
                    );
                    // Redirige al usuario
                  }
                }, 1000); // Disminuye en 1 cada segundo
              } else {
                this.errorUpdate = true;
              }
            },
            error => {
              this.errorUpdate = true;
              console.error('Error al actualizar el usuario', error);
            }
          );

        }

      }
    }
  }
}
